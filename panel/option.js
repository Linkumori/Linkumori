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
*/

import { readPurifyUrlsSettings, setDefaultSettings } from '../common/utils.js';
import { defaultSettings, SETTINGS_KEY, CANT_FIND_SETTINGS_MSG } from '../common/constants.js';

class OptionsPageController {
    constructor() {
        this.state = {
            isEnabled: false,
            historyApiProtection: false,
            blockHyperlinkAuditing: false,
            whitelist: [],
            updateBadgeOnOff: false,
            searchTerm: ''
        };

        // Cache DOM elements
        this.elements = {
            mainToggle: document.getElementById('mainToggle'),
            historyApiToggle: document.getElementById('historyApiToggle'),
            hyperlinkAuditingToggle: document.getElementById('hyperlinkAuditingToggle'),
            badgeToggle: document.getElementById('badgeToggle'),
            domainSearch: document.getElementById('domainSearch'),
            domainInput: document.getElementById('domainInput'),
            addDomainBtn: document.getElementById('addDomain'),
            exportBtn: document.getElementById('exportWhitelist'),
            importBtn: document.getElementById('importWhitelist'),
            whitelistTableBody: document.getElementById('whitelistTableBody'),
            themeToggle: document.getElementById('themeToggle'),
            removeAllDomainsBtn: document.getElementById('removeAllDomains'),

        };

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.initializeTheme();
        await this.loadInitialState();
        await this.setupVersion();
        chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this));
    }
    
    async setupVersion() {
        const versionElement = document.querySelector('.version');
        if (versionElement) {
            const version = await this.fetchExtensionVersion();
            versionElement.textContent = `Version ${version}`;
        }
    }
    
    async fetchExtensionVersion() {
        try {
            const manifest = await chrome.runtime.getManifest();
            return manifest.version;
        } catch (error) {
            console.error('Failed to fetch extension version:', error);
            return 'Unknown';
        }
    }

    setupEventListeners() {
        // Toggle buttons
        this.elements.mainToggle?.addEventListener('click', 
            () => this.handleToggle('isEnabled'));
        this.elements.historyApiToggle?.addEventListener('click', 
            () => this.handleToggle('historyApiProtection'));
        this.elements.hyperlinkAuditingToggle?.addEventListener('click', 
            () => this.handleToggle('blockHyperlinkAuditing'));
        this.elements.badgeToggle?.addEventListener('click', 
            () => this.handleToggle('updateBadgeOnOff'));

            this.elements.removeAllDomainsBtn?.addEventListener('click',
                () => this.handleRemoveAllDomains());
        

        // Domain management
        this.elements.addDomainBtn?.addEventListener('click', 
            () => this.handleAddDomain());
        this.elements.domainInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddDomain();
        });

        // Search functionality
        this.elements.domainSearch?.addEventListener('input', (e) => {
            this.state.searchTerm = e.target.value;
            this.renderWhitelist();
        });

        // Import/Export
        this.elements.exportBtn?.addEventListener('click', 
            () => this.handleExport());
        this.elements.importBtn?.addEventListener('click', 
            () => this.handleImport());

        // Theme toggle
        this.elements.themeToggle?.addEventListener('click', 
            () => this.toggleTheme());

        // Event delegation for remove buttons
        this.elements.whitelistTableBody?.addEventListener('click', (e) => {
            const removeButton = e.target.closest('.remove-button');
            if (removeButton) {
                const domain = removeButton.dataset.domain;
                if (domain) {
                    this.handleRemoveDomain(domain);
                }
            }
        });
    }

    async initializeTheme() {
        const getSystemTheme = () => {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const { theme } = await chrome.storage.local.get(['theme']);
        const currentTheme = theme || getSystemTheme();
        document.documentElement.setAttribute('data-theme', currentTheme);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            chrome.storage.local.get(['theme'], (result) => {
                if (!result.theme) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                }
            });
        });
    }

    async loadInitialState() {
        try {
            const settings = await new Promise(resolve => 
                readPurifyUrlsSettings(resolve));
                
            if (!Object.hasOwn(settings, SETTINGS_KEY)) {
                console.log(CANT_FIND_SETTINGS_MSG);
                setDefaultSettings();
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

    async handleToggle(key) {
        try {
            const newValue = !this.state[key];
            let storageKey = key;
            
            if (key === 'blockHyperlinkAuditing') {
                storageKey = 'updateHyperlinkAuditing';
            } else if (key === 'isEnabled') {
                storageKey = 'enabled';
            }
            
            await chrome.storage.local.set({ [storageKey]: newValue });
            
            if (key === 'isEnabled') {
                await chrome.runtime.sendMessage({
                    action: 'updateRuleSet',
                    enabled: newValue
                });
            } else if (key === 'blockHyperlinkAuditing') {
                await chrome.runtime.sendMessage({
                    action: 'updateHyperlinkAuditing',
                    enabled: newValue
                });
            } else if (key === 'updateBadgeOnOff') {
                await chrome.runtime.sendMessage({
                    action: 'updateBadgeOnOff',
                    enabled: newValue
                });
            }
            
            this.state[key] = newValue;
            this.updateUI();
        } catch (error) {
            console.error(`Failed to toggle ${key}:`, error);
        }
    }

    async handleAddDomain() {
        const domain = this.elements.domainInput?.value.trim().toLowerCase();
        
        if (!domain) return;
        
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
                if (this.elements.domainInput) {
                    this.elements.domainInput.value = '';
                }
            } else {
                alert('Domain is already in the whitelist');
            }
        } catch (error) {
            console.error('Failed to add domain:', error);
        }
    }

    async handleRemoveDomain(domain) {
        try {
            const newWhitelist = this.state.whitelist.filter(d => d !== domain);
            await chrome.storage.local.set({ whitelist: newWhitelist });
            
            // Notify service worker about whitelist update

            this.state.whitelist = newWhitelist;
            this.renderWhitelist();
        } catch (error) {
            console.error('Failed to remove domain:', error);
        }
    }
    async handleRemoveAllDomains() {
        if (confirm('Are you sure you want to remove all domains from the whitelist?')) {
            try {
                await chrome.storage.local.set({ whitelist: [] });
                
                // Notify service worker about whitelist update
                
    
                this.state.whitelist = [];
                this.renderWhitelist();
            } catch (error) {
                console.error('Failed to remove all domains:', error);
            }
        }
    }

    async handleExport() {
        try {
            const blob = new Blob([JSON.stringify(this.state.whitelist, null, 2)], { 
                type: 'application/json' 
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'linkumori-whitelist.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to export whitelist:', error);
            alert('Failed to export whitelist: ' + error.message);
        }
    }

    async handleImport() {
        try {
            const fileContent = await new Promise((resolve, reject) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
     
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) {
                        reject(new Error('No file selected'));
                        return;
                    }
     
                    try {
                        const text = await file.text();
                        resolve(text);
                    } catch (err) {
                        reject(err);
                    }
                };
     
                input.click();
            });
     
            const importedWhitelist = JSON.parse(fileContent);
     
            if (confirm(`Import ${importedWhitelist.length} domains?`)) {
                const newWhitelist = [...new Set([...this.state.whitelist, ...importedWhitelist])];
                await chrome.storage.local.set({ whitelist: newWhitelist });
                
                // Notify service worker about whitelist update
                await chrome.runtime.sendMessage({
                    action: 'updateWhitelist',
                    whitelist: newWhitelist
                });

                this.state.whitelist = newWhitelist;
                this.renderWhitelist();
                alert('Whitelist imported successfully!');
            }
        } catch (error) {
            console.error('Failed to import whitelist:', error);
            alert('Failed to import whitelist: ' + error.message);
        }
    }

    async toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        await chrome.storage.local.set({ theme: newTheme });
    }

    handleStorageChanges(changes, area) {
        let needsUpdate = false;
        
        if (Object.hasOwn(changes, SETTINGS_KEY)) {
            const { newValue } = changes[SETTINGS_KEY];
            this.state.isEnabled = newValue.status;
            needsUpdate = true;
        }
        
        if (Object.hasOwn(changes, 'historyApiProtection')) {
            this.state.historyApiProtection = changes.historyApiProtection.newValue;
            needsUpdate = true;
        }

        if (Object.hasOwn(changes, 'updateBadgeOnOff')) {
            this.state.updateBadgeOnOff = changes.updateBadgeOnOff.newValue;
            needsUpdate = true;
        }

        if (Object.hasOwn(changes, 'updateHyperlinkAuditing')) {
            this.state.blockHyperlinkAuditing = changes.updateHyperlinkAuditing.newValue;
            needsUpdate = true;
        }
        
        if (Object.hasOwn(changes, 'whitelist')) {
            this.state.whitelist = changes.whitelist.newValue;
            needsUpdate = true;
        }
        
        if (needsUpdate) {
            this.updateUI();
        }
    }

    updateUI() {
        this.updateToggleSwitch(this.elements.mainToggle, this.state.isEnabled);
        this.updateToggleSwitch(this.elements.historyApiToggle, this.state.historyApiProtection);
        this.updateToggleSwitch(this.elements.hyperlinkAuditingToggle, this.state.blockHyperlinkAuditing);
        this.updateToggleSwitch(this.elements.badgeToggle, this.state.updateBadgeOnOff);
        this.renderWhitelist();
    }

    updateToggleSwitch(element, isActive) {
        if (!element) return;
        
        const toggleSwitch = element.querySelector('.toggle-switch');
        if (toggleSwitch) {
            toggleSwitch.classList.toggle('active', isActive);
        }
    }

    renderWhitelist() {
        if (!this.elements.whitelistTableBody) return;

        const filteredDomains = this.state.whitelist.filter(domain =>
            domain.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );

        if (filteredDomains.length === 0) {
            this.elements.whitelistTableBody.innerHTML = `
                <tr>
                    <td colspan="2" class="empty-message">
                        ${this.state.searchTerm ? 'No matching domains found' : 'No domains in whitelist'}
                    </td>
                </tr>
            `;
            return;
        }

        this.elements.whitelistTableBody.innerHTML = filteredDomains.map(domain => `
            <tr>
                <td>${domain}</td>
                <td>
                    <button class="remove-button" data-domain="${domain}">
                        Remove
                    </button>
                </td>
            </tr>
        `).join('');
    }
}
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.theme) {
        document.documentElement.setAttribute('data-theme', changes.theme.newValue);
    }
});

// Initialize the controller and make it globally accessible
window.optionsController = new OptionsPageController();