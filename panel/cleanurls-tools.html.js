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

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const inputUrls = document.getElementById('inputUrls');
    const outputUrls = document.getElementById('outputUrls');
    const cleanUrls = document.getElementById('cleanUrls');
    const copyUrls = document.getElementById('copyUrls');
    const copyStatus = document.getElementById('copyStatus');

    // Theme handling
   // Get the saved theme from chrome.storage
// Function to get system color scheme
const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Get the saved theme or use system preference
chrome.storage.local.get(['theme'], (result) => {
    const savedTheme = result.theme || getSystemTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Listen for theme changes from storage
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.theme) {
        document.documentElement.setAttribute('data-theme', changes.theme.newValue);
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if there's no saved preference
    chrome.storage.local.get(['theme'], (result) => {
        if (!result.theme) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
});

    // Keep track of processed URLs
    let processedUrls = [];
    let isProcessing = false;

    // Listen for cleaned URL from background script
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "displayCleanedUrl") {
            processedUrls.push(message.cleanedUrl);
            outputUrls.value = processedUrls.join('\n');
        }
    });

    // Function to process URLs sequentially
    async function processUrls(urls) {
        if (isProcessing) return;
        
        isProcessing = true;
        processedUrls = []; // Reset processed URLs
        outputUrls.value = '';

        for (const url of urls) {
            if (url.trim()) {  // Only process non-empty URLs
                chrome.runtime.sendMessage({
                    action: "option.html",
                    url: url.trim()
                });
                // Add a small delay between processing each URL
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        isProcessing = false;
    }

    // Clean URLs button click handler
    cleanUrls.addEventListener('click', () => {
        const urls = inputUrls.value.trim().split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0);

        if (urls.length === 0) return;
        processUrls(urls);
    });

    // Copy URLs button click handler
    copyUrls.addEventListener('click', async () => {
        const cleanedUrls = outputUrls.value;
        if (!cleanedUrls) return;

        try {
            await navigator.clipboard.writeText(cleanedUrls);
            showCopySuccess();
        } catch (err) {
            console.error('Failed to copy URLs:', err);
            showCopyError();
        }
    });

    function showCopySuccess() {
        copyStatus.textContent = 'Successfully copied cleaned URLs!';
        copyStatus.style.color = 'var(--button-primary)';
        copyStatus.style.display = 'block';
        
        const originalText = copyUrls.innerHTML;
        copyUrls.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied!
        `;
        copyUrls.style.backgroundColor = 'var(--button-primary)';

        setTimeout(() => {
            copyUrls.innerHTML = originalText;
            copyUrls.style.backgroundColor = '';
            copyStatus.style.display = 'none';
        }, 2000);
    }

    function showCopyError() {
        copyStatus.textContent = 'Failed to copy URLs';
        copyStatus.style.color = 'var(--button-danger)';
        copyStatus.style.display = 'block';
        
        setTimeout(() => {
            copyStatus.style.display = 'none';
        }, 2000);
    }

    // Handle text input - allow Enter for new lines
    inputUrls.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            cleanUrls.click();
        }
    });
});


