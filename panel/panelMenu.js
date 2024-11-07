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
            tabs: {}
        };
        
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupDOM());
        } else {
            this.setupDOM();
        }
        
        // Initialize storage listeners
        chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this));
        
        // Load initial state
        await this.loadInitialState();
    }
    
    setupDOM() {
        // Cache DOM elements
        this.domElements = {
            toggleSwitch: document.querySelector('.toggle-switch'),
            toggleLabel: document.querySelector('.toggle-label'),
            whitelistContainer: document.getElementById('whitelistContainer'),
            domainInput: document.getElementById('domainInput'),
            mainContent: document.getElementById('mainContent'),
            whitelistContent: document.getElementById('whitelistContent'),
            licenseContent: document.getElementById('licenseContent'),
            tabs: {
                mainTab: document.getElementById('mainTab'),
                whitelistTab: document.getElementById('whitelistTab'),
                licenseTab: document.getElementById('licenseTab')
            }
        };
        
        // Set up event listeners
        document.getElementById('toggleButton').addEventListener('click', 
            () => this.togglePurifyUrlsSettings());
            
        document.getElementById('addDomain').addEventListener('click',
            () => this.handleAddDomain());
            
        this.domElements.domainInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddDomain();
            }
        });
        
        // Set up tab listeners
        Object.keys(this.domElements.tabs).forEach(tabId => {
            this.domElements.tabs[tabId]?.addEventListener('click', 
                () => this.switchTab(tabId));
        });
    }
    
    async loadInitialState() {
        try {
            // Load settings
            const settings = await new Promise(resolve => 
                readPurifyUrlsSettings(resolve));
                
            if (!Object.hasOwn(settings, SETTINGS_KEY)) {
                console.log(CANT_FIND_SETTINGS_MSG);
                await setDefaultSettings();
                return;
            }
            
            // Load whitelist
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
        
        // Domain validation
        const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/;
        if (!domainRegex.test(domain)) {
            alert('Please enter a valid domain (e.g., example.com)');
            return;
        }
        
        try {
            if (!this.state.whitelist.includes(domain)) {
                const newWhitelist = [...this.state.whitelist, domain];
                await chrome.storage.local.set({ whitelist: newWhitelist });
                this.state.whitelist = newWhitelist;
                this.renderWhitelist();
            } else {
                alert('Domain is already in the whitelist');
            }
            
            this.domElements.domainInput.value = '';
        } catch (error) {
            console.error('Failed to add domain:', error);
        }
    }
    
    async handleRemoveDomain(domain) {
        try {
            const newWhitelist = this.state.whitelist.filter(d => d !== domain);
            await chrome.storage.local.set({ whitelist: newWhitelist });
            this.state.whitelist = newWhitelist;
            this.renderWhitelist();
        } catch (error) {
            console.error('Failed to remove domain:', error);
        }
    }
    
    switchTab(tabId) {
        this.state.activeTab = tabId;
        
        // Update content visibility
        this.domElements.mainContent.style.display = 
            tabId === 'mainTab' ? 'flex' : 'none';
        this.domElements.whitelistContent.style.display = 
            tabId === 'whitelistTab' ? 'block' : 'none';
        this.domElements.licenseContent.style.display = 
            tabId === 'licenseTab' ? 'block' : 'none';
        
        // Update tab classes
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
            removeBtn.onclick = () => this.handleRemoveDomain(domain);
            
            item.appendChild(text);
            item.appendChild(removeBtn);
            container.appendChild(item);
        });
    }
}

// Initialize the controller
const controller = new PanelMenuController();