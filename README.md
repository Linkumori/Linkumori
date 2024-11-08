# Linkumori (URLs Purifier)

[![Builds](https://github.com/subham8907/Linkumori/actions/workflows/main.yml/badge.svg)](https://github.com/subham8907/Linkumori/actions/workflows/main.yml)

![Linkumori](https://github.com/subham8907/Linkumori/blob/main/icons/icon48.png)

Linkumori (URLs Purifier) is a powerful browser extension for Chromium-based browsers that enhances your privacy by purifying URLs, removing tracking parameters, and blocking hyperlink auditing, all without interrupting your browsing experience.

**Note:** This project is currently under construction and is a fork of UTM Eraser (Eraser). 

## Features

- Cleans URLs by removing tracking parameters without blocking or redirecting
- Utilizes both static and dynamic Declarative Net Request (DNR) rules for efficient URL cleaning at the network level
- Supports a wide range of websites and URL patterns
- Blocks hyperlink auditing for increased privacy
- Uses the History API to update URLs without page reloads
- Operates seamlessly in the background

## How It Works

1. **Static DNR rules**: Predefined rules that clean common tracking parameters across various websites.
2. **Dynamic DNR rules**: Allows for more flexible and up-to-date URL cleaning based on the latest tracking methods.
3. **History API**: For URLs that can't be caught by DNR rules, Linkumori uses the History API to clean the URL without reloading the page.
4. **Hyperlink Auditing Block**: Prevents websites from tracking your clicks on links that leave their site.

## Installation

### Load unpacked: Chrome, MS Edge or Brave (all desktop)

1. Clone this repository or download the source code to a permanent location (do not delete the folder after installation).
2. Open your Chromium-based browser (e.g., Chrome, Edge) and navigate to the extensions page.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

### CRX-file: other Chromium browsers (Opera/Vivaldi/Yandex)

1. Download the extension as a crx-file from latest release (right-click > save link as).
2. In your browser navigate to the extensions page
3. Enable "Developer mode" in the top right corner.
4. Drag your crx-file anywhere on the page to import it.

## Usage

Once installed, Linkumori works automatically in the background:

1. The extension icon in the browser toolbar shows the current status.
2. Click the icon to toggle the extension on or off.
3. Browse normally - Linkumori will clean URLs as you navigate, without any noticeable interruption to your browsing.


## Whitelisting System

Linkumori includes a domain whitelisting system that allows you to exempt specific domains from URL cleaning. However, the domain matching requires careful attention to the domain format.

### Important Notes About Domain Matching:

1. **Domain Matching Rules**:
  - For URLs with `www` prefix (e.g. `www.example.com`):
    - You can whitelist either as `www.example.com` OR `example.com` 
    - Both formats will work
  - For URLs without `www` prefix (e.g. `example.com`):
    - You must whitelist exactly as `example.com`
    - Using `www.example.com` will NOT work
  - For subdomains (e.g. `sub.example.com`):
    - You must whitelist exactly as `sub.example.com`

### Examples:

✅ Correct Usage:
- If URL is `https://www.example.com`:
 - Can whitelist as `www.example.com` OR
 - Can whitelist as `example.com` 
- If URL is `https://example.com`:
 - Must whitelist as `example.com`
- If URL is `https://sub.example.com`:
 - Must whitelist as `sub.example.com`

❌ Incorrect Usage:
- If URL is `https://example.com`:
 - Whitelisting as `www.example.com` won't work

### Best Practices:

1. Check the actual URL in your browser's address bar
2. For sites with `www`, you can use either format (`www.example.com` or `example.com`)
3. For sites without `www`, you must match exactly
4. For subdomains, always match exactly
5. Test the whitelist entry by visiting different pages on the domain
## Configuration

Linkumori uses configuration files to determine which parameters to remove from URLs:

- `rules/et_1` to `rules/et_10`: Static DNR rules
- `Artifact.json`: Additional URL cleaning patterns for the History API method

Advanced users can modify these files to customize the extension's behavior.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project uses multiple licenses:

### GPLv3 License

The following files are completely under the GNU General Public License v3:

- `/content.js`
- `/Linkumori-Artifact/Artifact.json`
- `/rules/original/rules1.json` to `/rules/original/rules3.json`
- `/rules/original/rules8.json` to `/rules/original/rules10.json`
- `icons/icon48.png`, `icons/icon96.png`, `icons/icon128.png`

Copyright (c) 2024 Subham Mahesh

### Mixed License (GPLv3 and MIT)

The following files contain a mix of GPLv3 and MIT licensed code:

- `manifest.json`
- `background.js`
- `/panel/panelMenu.html`
- `/panel/panelMenu.js`
- `common/constants.js`
- `common/utils.js`

GPLv3 portions: Copyright (c) 2024 Subham Mahesh
MIT portions: Copyright (c) 2022 Nick

### Derivative Work

Files `rules/adguard-modifed/rules5.json`, `rules/adguard-modifed/rules6.json`, and `rules/adguard-modifed/rules7.json`,`rules/adguard-modifed/rules4.json`,
 are modified works:

- Original work: https://github.com/AdguardTeam/AdguardFilters/blob/master/TrackParamFilter/sections/specific.txt
- Original work license: GNU General Public License v3
- Derivative work: Also under GNU General Public License v3
- Copyright for modified part only (c) 2024 Subham Mahesh

For more information about modifications, please see `rules/adguard-modifed/notice.txt`.

### Font License

This project uses the Liberation Serif Regular font, which is licensed under the SIL Open Font License, Version 1.1. The font is located in the `./liberation-fonts` directory.

## license

For full license texts, please see the [LICENSE](LICENSE) file in the project repository.

## Acknowledgments

- Based on the ERASER project by Nick (https://github.com/Psychosynthesis/Eraser/)
- Uses rules derived from AdguardTeam's AdguardFilters (https://github.com/AdguardTeam/AdguardFilters)
- Inspired by the need for greater privacy in online browsing

## Disclaimer

Linkumori is provided "as is" without warranty of any kind. Use at your own risk.
