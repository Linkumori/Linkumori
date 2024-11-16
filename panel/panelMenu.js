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
            whitelist: [],
            activeTab: 'mainTab'
        };
        
        this.domElements = {
            toggleSwitch: null,
            toggleLabel: null,
            whitelistContainer: null,
            domainInput: null,
            mainContent: null,
            whitelistContent: null,
            licenseContent: null,
            addCurrentButton: null,
            dynamicWhitelistButton: null,
            tabs: {}
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
            whitelistContainer: document.getElementById('whitelistContainer'),
            domainInput: document.getElementById('domainInput'),
            mainContent: document.getElementById('mainContent'),
            whitelistContent: document.getElementById('whitelistContent'),
            licenseContent: document.getElementById('licenseContent'),
            addCurrentButton: document.getElementById('addCurrentDomain'),
            dynamicWhitelistButton: document.getElementById('singledynamicwhitelistunwhitelistbutton'),
            tabs: {
                mainTab: document.getElementById('mainTab'),
                whitelistTab: document.getElementById('whitelistTab'),
                licenseTab: document.getElementById('licenseTab')
            }
        };
        
        document.getElementById('toggleButton')?.addEventListener('click', 
            () => this.togglePurifyUrlsSettings());
            
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
        
        // Initial update of all dynamic buttons
        await this.updateAllDynamicButtons();
    }

    // New method to update all dynamic buttons
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
    
    async loadInitialState() {
        try {
            const settings = await new Promise(resolve => 
                readPurifyUrlsSettings(resolve));
                
            if (!Object.hasOwn(settings, SETTINGS_KEY)) {
                console.log(CANT_FIND_SETTINGS_MSG);
                await setDefaultSettings();
                return;
            }
            
            const { whitelist = [], enabled = false } = 
                await chrome.storage.local.get(['whitelist', 'enabled']);
            
            this.state = {
                ...this.state,
                isEnabled: settings[SETTINGS_KEY].status,
                whitelist
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
            this.updateToggleUI();
        } catch (error) {
            console.error('Failed to toggle settings:', error);
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
    
    updateUI() {
        this.updateToggleUI();
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
            this.domElements.toggleLabel.textContent = 'On';
        } else {
            this.domElements.toggleSwitch.classList.remove('active');
            this.domElements.toggleLabel.textContent = 'Off';
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
}

// Initialize the controller
const controller = new PanelMenuController();
