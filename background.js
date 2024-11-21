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
    chrome.storage.local.set({ updateHyperlinkAuditing: true, firstInstalled: true, historyApiProtection: true });
    updateHyperlinkAuditing(true); // {{ edit_1 }}
      return; 
  }

  const updatesettings = await new Promise((resolve) => {
    chrome.storage.local.get('updateHyperlinkAuditing', (result) => { // {{ edit_1 }}
      resolve(result.updateHyperlinkAuditing);    });
  });
  const settings = await new Promise((resolve) => {
    chrome.storage.local.get(SETTINGS_KEY, (result) => {
      resolve(result[SETTINGS_KEY]);
    });
  });
  console.log('Settings hyperlink retrieved:', updatesettings);
  updateRuleSet(settings.status);
  updateDNRRules(settings.status);
  badge(settings.status);
  updateHyperlinkAuditing(updatesettings); // {{ edit_2 }}
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
   
    const updatesettings = await new Promise((resolve) => {
      chrome.storage.local.get('updateHyperlinkAuditing', (result) => { // {{ edit_1 }}
        resolve(result.updateHyperlinkAuditing);      });
    });
    const settings = await new Promise((resolve) => {
      chrome.storage.local.get(SETTINGS_KEY, (result) => {
        resolve(result[SETTINGS_KEY]);
      });
    });
    console.log('Settings hyperlink retrieved:', updatesettings);
    updateRuleSet(settings.status);
    updateDNRRules(settings.status);
    badge(settings.status);
    updateHyperlinkAuditing(updatesettings); // {{ edit_2 }}


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

    // Check if historyApiProtection is enabled
    const { historyApiProtection } = await chrome.storage.local.get('historyApiProtection');
    if (!historyApiProtection) {
      console.log('History API protection is not enabled, skipping content script injection.');
      return; // Early return if historyApiProtection is not enabled
    }

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
    updateHyperlinkAuditing(message.enabled)
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
        updateHyperlinkAuditing(newStatus);
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


const STORAGE = chrome.storage.local;
const STORAGE_KEY = 'whitelist';

const isValidUrl = url =>
  url && !['chrome:', 'file:', 'edge:'].some(p => url.startsWith(p)) && !!new URL(url).hostname;

const getTitle = (domain, isWhitelisted) =>
  `${isWhitelisted ? 'Remove' : 'Add'} ${domain} ${isWhitelisted ? 'from' : 'to'} whitelist`;

// Menu management
async function updateMenu(domain) {
  const { whitelist = [] } = await STORAGE.get(STORAGE_KEY);
  const isWhitelisted = whitelist.includes(domain);
  const title = getTitle(domain, isWhitelisted);

  try {
    // Remove existing menu items
    await chrome.contextMenus.removeAll();

    // Create new menu item
    chrome.contextMenus.create({
      id: 'whitelist-toggle',
      title,
      contexts: ['all'],
    });
  } catch (err) {
    console.error('Failed to update context menu:', err);
  }
}

async function removeMenu() {
  try {
    await chrome.contextMenus.removeAll();
  } catch (err) {
    console.error('Failed to remove context menu:', err);
  }
}

// Whitelist operations
async function toggleWhitelist(domain) {
  try {
    const { whitelist = [] } = await STORAGE.get(STORAGE_KEY);
    const newList = whitelist.includes(domain)
      ? whitelist.filter(d => d !== domain)
      : [...whitelist, domain];

    await STORAGE.set({ [STORAGE_KEY]: newList });
    await updateMenu(domain);
  } catch (err) {
    console.error('Failed to toggle whitelist:', err);
  }
}

// URL handling
async function handleUrl(url) {
  if (!url) return;

  try {
    const domain = new URL(url).hostname;
    if (isValidUrl(url)) {
      await updateMenu(domain);
    } else {
      await removeMenu();
    }
  } catch (err) {
    console.error('Failed to handle URL:', err);
    await removeMenu();
  }
}

// Event listeners
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try {
    const tab = await chrome.tabs.get(tabId);
    if (tab?.url) await handleUrl(tab.url);
  } catch (err) {
    console.error('Error in onActivated:', err);
  }
});

chrome.tabs.onUpdated.addListener((_, changeInfo) => {
  if (changeInfo.url) handleUrl(changeInfo.url);
});

chrome.contextMenus.onClicked.addListener((_, tab) => {
  if (tab?.url) {
    try {
      const domain = new URL(tab.url).hostname;
      toggleWhitelist(domain);
    } catch (err) {
      console.error('Failed to toggle whitelist from context menu:', err);
    }
  }
});

async function updateHyperlinkAuditing(enabled) {
  const ruleset15 = ['ruleset_11'];

  // Update static ruleset for ruleset_15
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: enabled ? [] : ruleset15,
    enableRulesetIds: enabled ? ruleset15 : []
  });
  console.log('Static rulese', enabled);  
}


// Add this to your background.js



// Add this to your existing message listener

// Update your chrome.runtime.onInstalled listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateHistoryApiProtection') {
    const { enabled } = message;
    chrome.storage.local.set({ historyApiProtection: enabled }, () => {
      sendResponse({ success: true });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
  // ... existing message handlers
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateHyperlinkAuditing') {
    const { enabled } = message;
    chrome.storage.local.set({ updateHyperlinkAuditing: enabled }, () => {
      updateHyperlinkAuditing(message.enabled);
    sendResponse({ success: true });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
  // ... existing message handlers
});