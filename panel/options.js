
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
// options.js
document.addEventListener('DOMContentLoaded', function() {
    const inputUrl = document.getElementById('inputUrl');
    const outputUrl = document.getElementById('outputUrl');
    const cleanButton = document.getElementById('cleanButton');
    const copyButton = document.getElementById('copyButton');
    const copyStatus = document.getElementById('copyStatus');

    // Keep track of processed URLs
    let processedUrls = [];
    let isProcessing = false;

    // Listen for cleaned URL from background script
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "displayCleanedUrl") {
            // Add the new cleaned URL to our list
            processedUrls.push(message.cleanedUrl);
            // Display all processed URLs, each on a new line
            outputUrl.value = processedUrls.join('\n');
        }
    });

    // Function to process URLs sequentially
    async function processUrls(urls) {
        if (isProcessing) return;
        
        isProcessing = true;
        processedUrls = []; // Reset processed URLs
        outputUrl.value = '';

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

    // Clean button click handler
    cleanButton.addEventListener('click', () => {
        const urls = inputUrl.value.trim().split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0); // Filter out empty lines

        if (urls.length === 0) {
            return;
        }

        processUrls(urls);
    });

    // Copy button click handler
    copyButton.addEventListener('click', async () => {
        const cleanedUrls = outputUrl.value;
        if (!cleanedUrls) {
            return;
        }

        try {
            await navigator.clipboard.writeText(cleanedUrls);
            copyStatus.textContent = 'Successfully copied cleaned URLs!';
            copyStatus.style.color = '#28a745';
            copyStatus.style.display = 'block';
            
            const originalText = copyButton.textContent;
            copyButton.textContent = '✓ Copied!';
            copyButton.style.backgroundColor = '#28a745';

            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.backgroundColor = '#007bff';
                copyStatus.style.display = 'none';
            }, 2000);

        } catch (err) {
            console.error('Failed to copy URLs:', err);
            copyStatus.textContent = 'Failed to copy URLs';
            copyStatus.style.color = '#dc3545';
            copyStatus.style.display = 'block';
            
            setTimeout(() => {
                copyStatus.style.display = 'none';
            }, 2000);
        }
    });

    // Handle text input - allow Enter for new lines
    inputUrl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.ctrlKey || e.metaKey) {
                // Ctrl+Enter (or Cmd+Enter on Mac) to process URLs
                e.preventDefault();
                cleanButton.click();
            }
            // Regular Enter just creates a new line - default behavior
        }
    });
});

