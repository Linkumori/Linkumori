/*
Linkumori (URLs Purifier) Extension for chromium based browsers
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
*   <https://github.com/Psychosynthesis/Eraser/blob/main/src/chrome/background.js>
*   Copyright (c) 2022 Nick
    MIT License:
*   You should have received a copy of the MIT License
*  If not <https://github.com/subham8907/Linkumori/blob/main/LICENSE-MAIN>

*/
// ===== Linkumori Engine Start =====//
import { readPurifyUrlsSettings, setDefaultSettings } from './common/utils.js';
import { defaultSettings, SETTINGS_KEY, CANT_FIND_SETTINGS_MSG } from './common/constants.js';

let hasStarted = false;

async function start() {
  if (hasStarted) {
    console.log('Start function already executed');
    return Promise.resolve();
  }

  try {
    const rulesets = await chrome.declarativeNetRequest.getEnabledRulesets();
    if (rulesets.length > 0) {
      console.log('Start function executed');
      await linkumoriwrite({ LinkumoriEngineStart: true });
    } else {
      console.log('Start not executed');
      await linkumoriwrite({ needsReload: true }, { quickreload: true });
      await badstart();
      console.log('Bad start fix executed, will reload on next startup');
    }
    hasStarted = true;
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

function linkumoriread(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}

function linkumoriwrite(obj) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(obj, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

async function badstart() {
  const quickreload = await linkumoriread('quickreload');
  if (quickreload) {
    await linkumoriread({ quickreload: true });
    chrome.runtime.reload();
  }
  console.log('performing quickreload');
}

chrome.runtime.onStartup.addListener(async () => {
  linkumoriread({ needsReload: true }).then(needsReload => {
    if (needsReload) {
      chrome.runtime.reload();
     linkumoriwrite({ needsReload: false });
     console.log('fixed ya');
    }
  });
});

async function initialize() {
  await firstInstalled();
  await start();
  await badge();
}

// Main execution
initialize().then(() => {
}).catch(reason => {
  console.trace(reason);
  linkumoriread('LinkumoriEngineStart').then((value) => {
    if (value === false) { return; }
    linkumoriwrite({ LinkumoriEngineStart: false }).then(() => {
      chrome.runtime.reload();
    });
  });
});

// Main execution
initialize().then(() => {
  console.log('Initialization complete');
}).catch(reason => {
  console.trace(reason);
  linkumoriread('LinkumoriEngineStart').then((value) => {
    if (value === false) { return; }
    linkumoriwrite({ LinkumoriEngineStart: false }).then(() => {
      chrome.runtime.reload();
    });
  });
});
/// fuction for first start ///
async function firstInstalled() {
  return new Promise((resolve) => {
    chrome.storage.local.get('firstInstalled', (result) => {
      if (result.firstInstalled === undefined) {
        chrome.storage.local.set({ firstInstalled: true }, () => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
}
/// fuctions for update and first installation

chrome.runtime.onInstalled.addListener(async () => {

  const isFirstInstall = await firstInstalled(); 
  if (isFirstInstall) {
     setDefaultSettings();
    return; 
  }

  const settings = await new Promise((resolve) => {
    chrome.storage.local.get(SETTINGS_KEY, (result) => {
      resolve(result[SETTINGS_KEY]);
    });
  });
  
  console.log('Settings retrieved:', settings);
  

  updateRuleSet(settings.status);
  updateDNRRules(settings.status);
  badge(settings.status);


});


async function updatefirstinstallruleset() {
  return new Promise((resolve) => {
    chrome.storage.local.get('updatefirstinstallruleset', (result) => {
      if (result.updatefirstinstallruleset === undefined) {
        chrome.storage.local.set({ updatefirstinstallruleset: true }, () => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
}

//// for updating rules on first installtatopn
chrome.runtime.onInstalled.addListener(async () => {
  const isupdatefirstinstallruleset = await updatefirstinstallruleset(); 
  if (isupdatefirstinstallruleset) {
    const settings = await new Promise((resolve) => {
      chrome.storage.local.get(SETTINGS_KEY, (result) => {
        resolve(result[SETTINGS_KEY]);
      });
    });
    
    console.log('Settings retrieved:', settings);
    
  
    updateRuleSet(settings.status);
    updateDNRRules(settings.status);
    badge(settings.status);
    chrome.alarms.create('wakeUpAlarm', { periodInMinutes: 1/60 });
    return; 
  }
});



/// main fuction start here//
/// here you can see it use dnr to enable and disable it//
async function updateRuleSet(enabled) {
  const allRulesets = ['ruleset_1', 'ruleset_2', 'ruleset_3', 'ruleset_4', 'ruleset_5', 'ruleset_6', 'ruleset_7', 'ruleset_8','ruleset_9','ruleset_10'];

  // Update static rulesets
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: enabled ? [] : allRulesets,
    enableRulesetIds: enabled ? allRulesets : []
  });
  console.log('Static rules updated:', enabled);  
}



  /// load all the regex in the array for changing url without reload using history api 
  let config = [];

/// proccessor of this fuction 
async function loadConfigAndCleanUrl(url) {
  try {
    const response = await fetch(chrome.runtime.getURL('./Linkumori-Artifact/Artifact.json'));
    config = await response.json();
  } catch (error) {
    console.error('Error loading configuration:', error);
    return url;
  }
  return cleanUrl(url);
}

function cleanUrl(url) {
  if (!config) {
    console.warn('Artifact is not defined. Returning original URL.');
    return url;
  }

  try {
    const urlObj = new URL(url);
    let paramsToRemove = [];

    for (const provider in config.providers) {
      const providerConfig = config.providers[provider];
      if (provider === 'all' || new RegExp(providerConfig.urlPattern).test(url)) {
        paramsToRemove = paramsToRemove.concat(providerConfig.param);
      }
    }

    paramsToRemove.forEach(param => {
      const regex = new RegExp(`^${param}$`);
      for (const key of urlObj.searchParams.keys()) {
        if (regex.test(key)) {
          urlObj.searchParams.delete(key);
        }
      }
    });

    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

loadConfigAndCleanUrl();


// Inject content script
async function injectContentScript(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    const url = tab.url;

    // Check if the URL is allowed for scripting
    if (url.startsWith('chrome://') || url.startsWith('https://chromewebstore.google.com/') || url.startsWith('edge://') || url.startsWith('file:///')
      || url.startsWith('chrome-extension://') || url.startsWith('https://microsoftedge.microsoft.com/addons/')) {
      return;
    }

    // Check if the extension is enabled
    const settings = await new Promise((resolve) => {
      chrome.storage.local.get(SETTINGS_KEY, (result) => {
        resolve(result[SETTINGS_KEY]);
      });
    });

    if (!settings || !settings.status) {
      console.log('Extension is disabled, skipping content script injection.');
      return;
    }

    const { whitelist } = await chrome.storage.local.get('whitelist');

    const isWhitelisted = whitelist.some(domain => url.includes(domain));
    if (isWhitelisted) {
      return; 
    }

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  } catch (error) {
    console.error('Error in injectContentScript:', error);
  }
}


chrome.tabs.onUpdated.addListener(handleTabUpdate);

async function handleTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    await injectContentScript(tabId);

    if (changeInfo.url && config) {
      const cleanedUrl = cleanUrl(changeInfo.url);
      if (cleanedUrl !== changeInfo.url) {
        try {
          const response = await chrome.tabs.sendMessage(tabId, { action: "updateUrl", url: cleanedUrl });
        } catch (error) {
          console.error('Error sending updateUrl message:', error);
        }
      }
    }
  }
}

/// all the setting fuction works here///


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get-settings') {
    readPurifyUrlsSettings((settings) => {
      if (!Object.hasOwn(settings, SETTINGS_KEY)) {
        console.log(CANT_FIND_SETTINGS_MSG);
        setDefaultSettings();
        sendResponse(defaultSettings);
        updateRuleSet(defaultSettings.status);
        updateDNRRules(defaultSettings.status);
        badge(defaultSettings.status);
      } else {
        sendResponse(settings);
        updateRuleSet(settings[SETTINGS_KEY].status);
        updateDNRRules(settings[SETTINGS_KEY].status);
        badge(settings[SETTINGS_KEY].status);
      }
    });
    return true; // Indicates that the response is sent asynchronously
  } else if (message.action === 'updateRuleSet') {
    updateRuleSet(message.enabled);
    updateDNRRules(message.enabled);
    badge(message.enabled);
    chrome.storage.local.set({ [SETTINGS_KEY]: { status: message.enabled } });
    sendResponse({ success: true });
  } else if (message.action === "cleanUrl") {
    const cleanedUrl = cleanUrl(message.url);
    sendResponse({ cleanedUrl: cleanedUrl });
  } else if (message.action === "toggleExtension") {
    chrome.storage.local.get(SETTINGS_KEY, (settings) => {
      const newStatus = !settings[SETTINGS_KEY].status;
      chrome.storage.local.set({ [SETTINGS_KEY]: { status: newStatus } }, () => {
        updateRuleSet(newStatus);
        updateDNRRules(newStatus);
        badge(newStatus);
        sendResponse({ status: newStatus ? "activated" : "deactivated" });
      });
    });
  } 
  return true; // Indicates that the response will be sent asynchronously
});



async function badge(enabled) {
  if (enabled) {
    await chrome.declarativeNetRequest.setExtensionActionOptions({
      displayActionCountAsBadgeText: true
    });
  }
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'wakeUpAlarm') {
    // Removed updateRuleSet call
  }
});

// Initialize badge text when extension loads

const RULE_ID_START = 1;

// Initialize default state
chrome.runtime.onInstalled.addListener(async () => {
  const {whitelist } = await chrome.storage.local.get(['whitelist']);
  if (!whitelist) {
    await chrome.storage.local.set({ whitelist: [] });
  }
});

// Function to create a rule for a domain with exact format
function createAllowRule(domain, ruleId) {
  return [{
    id: ruleId,
    priority: 1,
    action: {
      type: "allow"
    },
    condition: {
      requestDomains: [domain],
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "ping",
        "xmlhttprequest"
      ]
    }
  },
  {
    id: ruleId + 1,
    priority: 1,
    action: {
      type: "allow"
    },
    condition: {
      initiatorDomains: [domain],
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "ping",
        "xmlhttprequest"
      ]
    }
  }];
}

// Function to update DNR rules based on enabled state
async function updateDNRRules(enabled) {
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    if (enabled) {
      const { whitelist = [] } = await chrome.storage.local.get('whitelist');
      const newRules = whitelist.flatMap((domain, index) => 
        createAllowRule(domain, (index * 2) + RULE_ID_START)
      );

      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: newRules
      });
      console.log('dynamic rules updated:', enabled);
    } else {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: []
      });
      console.log('dynamic rules updated:', enabled);
    }
  } catch (error) {
    console.error('Error updating DNR rules:', error);
  }
}

// Listen for storage changes
chrome.storage.onChanged.addListener(async (changes) => {
  if (changes.whitelist) {
    updateDNRRule();
      }
    }
  )

// Listen for storage changes
async function updateDNRRule() {
  const settings = await new Promise((resolve) => {
    chrome.storage.local.get(SETTINGS_KEY, (result) => {
      resolve(result[SETTINGS_KEY]);
    });
  });

  console.log('Settings retrieved:', settings);
  
  updateDNRRules(settings.status);
}

// Create context menu item for updating whitelist based on domain
let contextMenuCreated = false;

function createContextMenu() {
  if (!contextMenuCreated) {
    chrome.contextMenus.create({
      id: "toggleWhitelistDomain",
      title: "Loading...", // Initial placeholder title
      contexts: ["all"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error creating context menu:', chrome.runtime.lastError);
        return;
      }
      contextMenuCreated = true;
    });
  }
}

// Update context menu title based on current domain's whitelist status
async function updateContextMenuTitle(domain) {
  try {
    const { whitelist } = await chrome.storage.sync.get('whitelist') || { whitelist: [] };
    const isWhitelisted = whitelist.includes(domain);
    const newTitle = isWhitelisted ?
      `Remove ${domain} from whitelist` :
      `Add ${domain} to whitelist`;

    // Only update if the context menu exists
    if (contextMenuCreated) {
      chrome.contextMenus.update("toggleWhitelistDomain", {
        title: newTitle
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error updating context menu:', chrome.runtime.lastError);
        }
      });
    }
  } catch (error) {
    console.error('Error getting whitelist:', error);
  }
}

// Check if URL is valid for context menu
function isValidUrl(url) {
  return url && 
         !url.startsWith('chrome:') && 
         !url.startsWith('file:') && 
         !url.startsWith('edge:');
}

// Handle tab URL changes
async function handleTabUrl(url) {
  if (!url) return;
  
  try {
    const parsedUrl = new URL(url);
    if (isValidUrl(url)) {
      createContextMenu();
      await updateContextMenuTitle(parsedUrl.hostname);
    } else {
      removeContextMenu();
    }
  } catch (error) {
    console.error('Error handling tab URL:', error);
    removeContextMenu();
  }
}

// Remove the context menu
function removeContextMenu() {
  if (contextMenuCreated) {
    chrome.contextMenus.remove('toggleWhitelistDomain', () => {
      if (chrome.runtime.lastError) {
        console.error('Error removing context menu:', chrome.runtime.lastError);
        return;
      }
      contextMenuCreated = false;
    });
  }
}

// Toggle domain in whitelist
async function toggleDomainWhitelist(domain) {
  try {
    const { whitelist = [] } = await chrome.storage.local.get('whitelist');
    
    const updatedWhitelist = whitelist.includes(domain) 
      ? whitelist.filter(d => d !== domain)
      : [...whitelist, domain];

    await chrome.storage.local.set({ whitelist: updatedWhitelist });
    
    // Update context menu after whitelist change
    await updateContextMenuTitle(domain);
  } catch (error) {
    console.error('Error toggling whitelist:', error);
  }
}

// Event Listeners
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
      await handleTabUrl(tab.url);
    }
  } catch (error) {
    console.error('Error handling activated tab:', error);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    await handleTabUrl(changeInfo.url);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toggleWhitelistDomain') {
    const url = info.linkUrl || info.pageUrl;
    try {
      const domain = new URL(url).hostname;
      toggleDomainWhitelist(domain);
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeContextMenu') {
    removeContextMenu();
    sendResponse({ success: true });
  }
  return true;
});

// Initialize context menu state on extension startup
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  if (tabs[0]?.url) {
    await handleTabUrl(tabs[0].url);
  }
});



// ===== Linkumori Engine Ends =====//
