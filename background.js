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
/// end this here


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

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  } catch (none) {
  }
}

// Handle tab updates
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






// const RULE_ID_START = 1; // Unused constant, consider removing if not needed
const RULE_ID_START = 1;

// Initialize default state
chrome.runtime.onInstalled.addListener(async () => {
  const { enabled, whitelist } = await chrome.storage.local.get(['enabled', 'whitelist']);
  if (enabled === undefined) {
    await chrome.storage.local.set({ enabled: true });
  }
  if (!whitelist) {
    await chrome.storage.local.set({ whitelist: [] });
  }
  await updateDNRRules();
});

// Function to create a rule for a domain with exact format
function createAllowRule(domain, ruleId) {
  return {
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
  };
}

// Function to enable DNR rules
async function enableDNRRules() {
  try {
    const { whitelist = [] } = await chrome.storage.local.get('whitelist');
    
    // Get existing rules to remove them
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    // Create rules array with exact format
    const newRules = whitelist.map((domain, index) => 
      createAllowRule(domain, index + RULE_ID_START)
    );

    // Update rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: newRules
    });

  } catch (error) {
    console.error('Error enabling DNR rules:', error);
  }
}

// Function to disable all DNR rules
async function disableDNRRules() {
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);
    
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: []
    });

  } catch (error) {
    console.error('Error disabling DNR rules:', error);
  }
}

// Main function to update DNR rules based on enabled state
async function updateDNRRules() {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  if (enabled) {
    await enableDNRRules();
  } else {
    await disableDNRRules();
  }
}

// Listen for storage changes
chrome.storage.local.onChanged.addListener((changes) => {
  if (changes.enabled) {
    const isEnabled = changes.enabled.newValue;
    if (isEnabled) {
      enableDNRRules();
    } else {
      disableDNRRules();
    }
  } else if (changes.whitelist && changes.enabled?.newValue !== false) {
    enableDNRRules();
  }
});

// Handle browser startup
chrome.runtime.onStartup.addListener(async () => {
  await updateDNRRules();
});

// ===== Linkumori Engine Ends =====//
