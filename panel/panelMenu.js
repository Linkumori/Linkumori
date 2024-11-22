/*
Linkumori(URLs Purifier)
Copyright (C) 2024 Subham Mahesh

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* Based on:
*   ERASER
*   <https://github.com/Psychosynthesis/Eraser/blob/main/src/chrome/panel/panelMenu.js>
*   Copyright (c) 2022 Nick
MIT License:
*   You should have received a copy of the MIT License
*  If not <https://github.com/subham8907/Linkumori/blob/main/LICENSE-MAIN>
*/
import { readPurifyUrlsSettings, setDefaultSettings } from '../common/utils.js';
import { defaultSettings, SETTINGS_KEY, CANT_FIND_SETTINGS_MSG } from '../common/constants.js';

class PanelMenuController {
    constructor() {
        this.state = {
            isEnabled: false,
            historyApiProtection: false,
            blockHyperlinkAuditing: false,
            whitelist: [],
            activeTab: 'mainTab',
            updateBadgeOnOff: false
        };
        
        this.domElements = {
            toggleSwitch: null,
            toggleLabel: null,
            historyApiToggle: null,
            historyApiLabel: null,
            hyperlinkAuditingToggle: null,
            hyperlinkAuditingLabel: null,
            whitelistContainer: null,
            domainInput: null,
            mainContent: null,
            whitelistContent: null,
            licenseContent: null,
            addCurrentButton: null,
            dynamicWhitelistButton: null,
            tabs: {},
            badgeOnOffToggle: null,
            badgeOnOffLabel: null
        };
        
        this.init();
    }
    async init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupDOM());
        } else {
            this.setupDOM();
        }
        
        chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this));
        
        chrome.tabs.onActivated.addListener(() => this.updateAllDynamicButtons());
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (changeInfo.status === 'complete') {
                this.updateAllDynamicButtons();
            }
        });
        
        await this.loadInitialState();
    }
    
    async setupDOM() {
        this.domElements = {
            toggleSwitch: document.querySelector('.toggle-switch'),
            toggleLabel: document.querySelector('.toggle-label'),
            historyApiToggle: document.querySelector('#newToggleButton .toggle-switch'),
            historyApiLabel: document.querySelector('#newToggleButton .toggle-label'),
            hyperlinkAuditingToggle: document.querySelector('#blockHyperlinkAuditingToggle .toggle-switch'),
            hyperlinkAuditingLabel: document.querySelector('#blockHyperlinkAuditingToggle .toggle-label'),
            whitelistContainer: document.getElementById('whitelistContainer'),
            domainInput: document.getElementById('domainInput'),
            mainContent: document.getElementById('mainContent'),
            whitelistContent: document.getElementById('whitelistContent'),
            licenseContent: document.getElementById('licenseContent'),
            addCurrentButton: document.getElementById('addCurrentDomain'),
            dynamicWhitelistButton: document.getElementById('singledynamicwhitelistunwhitelistbutton'),
            badgeOnOffToggle: document.querySelector('#updateBadgeOnOff .toggle-switch'),
            badgeOnOffLabel: document.querySelector('#updateBadgeOnOff .toggle-label'),
            tabs: {
                mainTab: document.getElementById('mainTab'),
                whitelistTab: document.getElementById('whitelistTab'),
                licenseTab: document.getElementById('licenseTab')
            }
        };
        
        document.getElementById('toggleButton')?.addEventListener('click', 
            () => this.togglePurifyUrlsSettings());
        
        document.getElementById('newToggleButton')?.addEventListener('click',
            this.toggleHistoryApiProtection.bind(this));
            
        document.getElementById('blockHyperlinkAuditingToggle')?.addEventListener('click',
            () => this.toggleHyperlinkAuditing());

        document.getElementById('updateBadgeOnOff')?.addEventListener('click',
            () => this.toggleBadgeOnOff());
            
        document.getElementById('addDomain')?.addEventListener('click',
            () => this.handleAddDomain());

            this.domElements.domainInput?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleAddDomain();
                }
            });
            
            this.domElements.dynamicWhitelistButton?.addEventListener('click',
                () => this.handleDynamicWhitelistToggle());
                
            this.domElements.addCurrentButton?.addEventListener('click',
                () => this.handlecurrentbutton());
            
            Object.keys(this.domElements.tabs).forEach(tabId => {
                this.domElements.tabs[tabId]?.addEventListener('click', 
                    () => this.switchTab(tabId));
            });
            
            await this.updateAllDynamicButtons();
        }
        async updatedynamicurrentbutton() {
            const domain = await this.getCurrentTabDomain();
            if (!domain || !this.domElements.addCurrentButton) {
                if (this.domElements.addCurrentButton) {
                    this.domElements.addCurrentButton.style.display = 'none';
                }
                return;
            }
            
            const isWhitelisted = this.state.whitelist.includes(domain);
            if (this.domElements.addCurrentButton) {
                this.domElements.addCurrentButton.textContent = isWhitelisted ? 
                    `Remove ${domain} from Whitelist` : `Add ${domain} to Whitelist`;
                this.domElements.addCurrentButton.style.display = 'block';
            }
        }
        
        async handleAddDomain() {
            const domain = this.domElements.domainInput?.value.trim().toLowerCase();
            
            if (!domain) return;
            
            const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/;
            if (!domainRegex.test(domain)) {
                alert('Please enter a valid domain (e.g., example.com)');
                return;
            }
            
            try {
                if (!this.state.whitelist.includes(domain)) {
                    await this.handleWhitelistChange(domain, true);
                } else {
                    alert('Domain is already in the whitelist');
                }
                
                if (this.domElements.domainInput) {
                    this.domElements.domainInput.value = '';
                }
            } catch (error) {
                console.error('Failed to add domain:', error);
            }
        }
    
        async handleWhitelistChange(domain, shouldAdd) {
            try {
                let newWhitelist;
                if (shouldAdd) {
                    newWhitelist = [...this.state.whitelist, domain];
                } else {
                    newWhitelist = this.state.whitelist.filter(d => d !== domain);
                }
                
                await chrome.storage.local.set({ whitelist: newWhitelist });
                this.state.whitelist = newWhitelist;
                this.renderWhitelist();
                await this.updateAllDynamicButtons();
            } catch (error) {
                console.error('Failed to update whitelist:', error);
            }
        }
        
        async handleDynamicWhitelistToggle() {
            const domain = await this.getCurrentTabDomain();
            if (!domain) {
                alert('Could not get domain from current tab');
                return;
            }
    
            const isWhitelisted = this.state.whitelist.includes(domain);
            await this.handleWhitelistChange(domain, !isWhitelisted);
        }
    
        async handlecurrentbutton() {
            const domain = await this.getCurrentTabDomain();
            if (!domain) {
                alert('Could not get domain from current tab');
                return;
            }
    
            const isWhitelisted = this.state.whitelist.includes(domain);
            await this.handleWhitelistChange(domain, !isWhitelisted);
        }
        
        async updateDynamicWhitelistButton() {
            const domain = await this.getCurrentTabDomain();
            if (!domain || !this.domElements.dynamicWhitelistButton) {
                if (this.domElements.dynamicWhitelistButton) {
                    this.domElements.dynamicWhitelistButton.style.display = 'none';
                }
                return;
            }
            
            const isWhitelisted = this.state.whitelist.includes(domain);
            if (this.domElements.dynamicWhitelistButton) {
                this.domElements.dynamicWhitelistButton.textContent = isWhitelisted ? 
                    `Remove ${domain} from Whitelist` : `Add ${domain} to Whitelist`;
                this.domElements.dynamicWhitelistButton.style.display = 'block';
            }
        }
    
        renderWhitelist() {
            if (!this.domElements.whitelistContainer) return;
            
            const container = this.domElements.whitelistContainer;
            container.innerHTML = '';
            
            if (this.state.whitelist.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No domains in whitelist';
                container.appendChild(emptyMessage);
                return;
            }
            
            this.state.whitelist.forEach(domain => {
                const item = document.createElement('div');
                item.className = 'domain-item';
                
                const text = document.createElement('span');
                text.textContent = domain;
                
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => this.handleWhitelistChange(domain, false);
                
                item.appendChild(text);
                item.appendChild(removeBtn);
                container.appendChild(item);
            });
        }
        async loadInitialState() {
            try {
                const settings = await new Promise(resolve => 
                    readPurifyUrlsSettings(resolve));
                    
                if (!Object.hasOwn(settings, SETTINGS_KEY)) {
                    console.log(CANT_FIND_SETTINGS_MSG);
                    await setDefaultSettings();
                    return;
                }
                
                const { 
                    whitelist = [], 
                    enabled = false,
                    historyApiProtection = false,
                    updateHyperlinkAuditing = false,
                    updateBadgeOnOff = false
                } = await chrome.storage.local.get({
                    whitelist: [], 
                    enabled: false,
                    historyApiProtection: false,
                    updateHyperlinkAuditing: false,
                    updateBadgeOnOff: false
                });
                
                this.state = {
                    ...this.state,
                    isEnabled: settings[SETTINGS_KEY].status,
                    historyApiProtection,
                    blockHyperlinkAuditing: updateHyperlinkAuditing,
                    whitelist,
                    updateBadgeOnOff
                };
                
                this.updateUI();
            } catch (error) {
                console.error('Failed to load initial state:', error);
            }
        }
        handleStorageChanges(changes, area) {
            if (Object.hasOwn(changes, SETTINGS_KEY)) {
                const { newValue } = changes[SETTINGS_KEY];
                this.state.isEnabled = newValue.status;
                this.updateToggleUI();
            }
            
            if (Object.hasOwn(changes, 'historyApiProtection')) {
                this.state.historyApiProtection = changes.historyApiProtection.newValue;
                this.updateHistoryApiToggleUI();
            }
    
            if (Object.hasOwn(changes, 'updateBadgeOnOff')) {
                this.state.updateBadgeOnOff = changes.updateBadgeOnOff.newValue;
                this.updateBadgeOnOffToggleUI();
            }
    
            if (Object.hasOwn(changes, 'blockHyperlinkAuditing')) {
                this.state.blockHyperlinkAuditing = changes.blockHyperlinkAuditing.newValue;
                this.updateHyperlinkAuditingToggleUI();
            }
            
            if (Object.hasOwn(changes, 'whitelist')) {
                this.state.whitelist = changes.whitelist.newValue;
                this.renderWhitelist();
                this.updateAllDynamicButtons();
            }
        }
    
        async togglePurifyUrlsSettings() {
            try {
                const newStatus = !this.state.isEnabled;
                
                await chrome.storage.local.set({
                    [SETTINGS_KEY]: {
                        ...this.state,
                        status: newStatus,
                    }
                });
                
                await chrome.runtime.sendMessage({
                    action: 'updateRuleSet', 
                    enabled: newStatus
                });
                
                this.state.isEnabled = newStatus;
                this.updateUI();
            } catch (error) {
                console.error('Failed to toggle settings:', error);
            }
        }
    
        async toggleHistoryApiProtection() {
            this.state.historyApiProtection = !this.state.historyApiProtection;
            await chrome.storage.local.set({ historyApiProtection: this.state.historyApiProtection });
            this.updateUI();
        }
        async toggleHyperlinkAuditing() {
            try {
                const newStatus = !this.state.blockHyperlinkAuditing;
                
                await chrome.storage.local.set({
                    blockHyperlinkAuditing: newStatus
                });
                
                this.state.blockHyperlinkAuditing = newStatus;
                this.updateHyperlinkAuditingToggleUI();
                
                await chrome.runtime.sendMessage({
                    action: 'updateHyperlinkAuditing',
                    enabled: newStatus
                });
            } catch (error) {
                console.error('Failed to toggle Hyperlink Auditing:', error);
            }
        }
    
        async toggleBadgeOnOff() {
            try {
                const newStatus = !this.state.updateBadgeOnOff;
                
                await chrome.storage.local.set({ 
                    updateBadgeOnOff: newStatus 
                });
                
                this.state.updateBadgeOnOff = newStatus;
                this.updateBadgeOnOffToggleUI();
                
                await chrome.runtime.sendMessage({
                    action: 'updateBadgeOnOff',
                    enabled: newStatus
                });
            } catch (error) {
                console.error('Failed to toggle Badge On/Off:', error);
            }
        }
        
        async updateAllDynamicButtons() {
            await this.updateDynamicWhitelistButton();
            await this.updatedynamicurrentbutton();
        }
        
        async getCurrentTabDomain() {
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab?.url) return null;
                
                const specialProtocols = [
                    'chrome://',
                    'edge://',
                    'chrome-extension://',
                    'file:///'
                ];
                
                if (specialProtocols.some(protocol => tab.url.startsWith(protocol))) {
                    return null;
                }
                
                const url = new URL(tab.url);
                return url.hostname.toLowerCase();
            } catch (error) {
                console.error('Failed to get current tab domain:', error);
                return null;
            }
        }
        updateUI() {
            this.updateToggleUI();
            this.updateHistoryApiToggleUI();
            this.updateHyperlinkAuditingToggleUI();
            this.updateBadgeOnOffToggleUI();
            this.renderWhitelist();
            this.updateAllDynamicButtons();
            this.switchTab(this.state.activeTab);
        }
        
        updateToggleUI() {
            if (!this.domElements.toggleSwitch || !this.domElements.toggleLabel) {
                return;
            }
            
            if (this.state.isEnabled) {
                this.domElements.toggleSwitch.classList.add('active');
                this.domElements.toggleLabel.textContent = 'Extension status: On with DNR protection';
            } else {
                this.domElements.toggleSwitch.classList.remove('active');
                this.domElements.toggleLabel.textContent = 'Extension status: Off';
            }
        }
    
        updateHistoryApiToggleUI() {
            if (!this.domElements.historyApiToggle || !this.domElements.historyApiLabel) {
                return;
            }
            
            if (this.state.historyApiProtection) {
                this.domElements.historyApiToggle.classList.add('active');
            } else {
                this.domElements.historyApiToggle.classList.remove('active');
            }
    
            const status = this.state.historyApiProtection ? 'On' : 'Off';
            const suffix = !this.state.isEnabled ? ' (Inactive - Extension Off)' : '';
            this.domElements.historyApiLabel.textContent = `History API Protection: ${status}${suffix}`;
        }
    
        updateHyperlinkAuditingToggleUI() {
            if (!this.domElements.hyperlinkAuditingToggle || !this.domElements.hyperlinkAuditingLabel) {
                return;
            }
            
            if (this.state.blockHyperlinkAuditing) {
                this.domElements.hyperlinkAuditingToggle.classList.add('active');
            } else {
                this.domElements.hyperlinkAuditingToggle.classList.remove('active');
            }
    
            const status = this.state.blockHyperlinkAuditing ? 'On' : 'Off';
            const suffix = !this.state.isEnabled ? ' (Inactive - Extension Off)' : '';
            this.domElements.hyperlinkAuditingLabel.textContent = `Block Hyperlink Auditing: ${status}${suffix}`;
        }
    
        updateBadgeOnOffToggleUI() {
            const toggle = this.domElements.badgeOnOffToggle;
            const label = this.domElements.badgeOnOffLabel;
            if (!toggle || !label) return;
        
            if (this.state.updateBadgeOnOff) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        
            const status = this.state.updateBadgeOnOff ? 'On' : 'Off';
            const suffix = !this.state.isEnabled ? ' (Inactive - Extension Off)' : '';
            label.textContent = `Badge: ${status}${suffix}`;
        }
    
        // Initialize the controller
        switchTab(tabId) {
            this.state.activeTab = tabId;
            
            this.domElements.mainContent.style.display = 
                tabId === 'mainTab' ? 'flex' : 'none';
            this.domElements.whitelistContent.style.display = 
                tabId === 'whitelistTab' ? 'block' : 'none';
            this.domElements.licenseContent.style.display = 
                tabId === 'licenseTab' ? 'block' : 'none';
            
            Object.keys(this.domElements.tabs).forEach(key => {
                const tab = this.domElements.tabs[key];
                if (tab) {
                    tab.classList.toggle('active', key === tabId);
                }
            });
        }
    }
   
    
    // Initialize the controller
    const controller = new PanelMenuController();