# Linkumori (Clean URLs)

![GitHub release of extension (latest by date)](https://img.shields.io/github/v/release/subham8907/Linkumori?style=flat&label=Extension%20Github%20Release&color=blue)

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kcpfnbjlimolkcjllfooaipdpdjmjigg?label=Chrome%20Web%20Store&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/linkumori-clean-urls/kcpfnbjlimolkcjllfooaipdpdjmjigg)

![Linkumori](https://github.com/subham8907/Linkumori/blob/main/icons/icon128.png)


 <a href="https://chromewebstore.google.com/detail/linkumori-clean-urls/kcpfnbjlimolkcjllfooaipdpdjmjigg
"><img height="58" src="https://i.imgur.com/K9Yh8G9.png" alt="Chrome Web Store"></a>

Linkumori (URLs Purifier) is a powerful browser extension for Chromium-based browsers that enhances your privacy by purifying URLs, removing tracking parameters, and blocking hyperlink auditing, all without interrupting your browsing experience.

## Features

- Cleans URLs by removing tracking parameters without blocking or redirecting
- Utilizes both static and dynamic Declarative Net Request (DNR) rules for efficient URL cleaning at the network level
- Supports a wide range of websites and URL patterns
- Blocks hyperlink auditing for increased privacy
- Uses the History API to update URLs without page reloads
- Operates seamlessly in the background
- Supports dark/light mode theme toggle
- Advanced tools interface for additional functionality

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
4. Use the theme toggle to switch between dark and light modes.
5. Access advanced tools through the dedicated button in the interface.

## Interface Guide

### Main Tab
![Main Tab Interface](https://github.com/subham8907/Linkumori/blob/main/docs/images/main.png)
- Simple On/Off toggle switch
- Current extension status display
- Theme toggle button
- Advanced tools access
- Clean, minimalist design
- History API Protection toggle
- Hyperlink Auditing Block toggle

### Whitelist Management
![Whitelist Interface](https://github.com/subham8907/Linkumori/blob/main/docs/images/whitelist-active.png)
- Domain input field with Add button
- "Add Current Domain" button for quick whitelisting
- List of whitelisted domains
- Quick remove options for each domain

### License Information
![License Tab](https://github.com/subham8907/Linkumori/blob/main/docs/images/license.png)
- Complete license details
- User rights and obligations
- Scrollable interface for full license text
- Links to external repositories and licenses

## Whitelisting System

Linkumori includes a domain whitelisting system that allows you to exempt specific domains from URL cleaning. However, the domain matching requires careful attention to the domain format.

### Domain Matching Rules:
1. For URLs with `www` prefix (e.g. `www.example.com`):
   - Can whitelist as `www.example.com` OR `example.com` 
   - Both formats will work
2. For URLs without `www` prefix (e.g. `example.com`):
   - Must whitelist exactly as `example.com`
   - Using `www.example.com` will NOT work
3. For subdomains (e.g. `sub.example.com`):
   - Must whitelist exactly as `sub.example.com`

### Usage Examples:
✅ Correct Usage:
- For `https://www.example.com`:
  - Can use `www.example.com` OR `example.com` 
- For `https://example.com`:
  - Must use `example.com`
- For `https://sub.example.com`:
  - Must use `sub.example.com`

❌ Incorrect Usage:
- For `https://example.com`:
  - Using `www.example.com` won't work

### Best Practices:
1. Check the actual URL in your browser's address bar
2. For sites with `www`, you can use either format
3. For sites without `www`, must match exactly
4. For subdomains, always match exactly
5. Test the whitelist entry by visiting different pages on the domain

## Configuration

Linkumori uses configuration files to determine which parameters to remove from URLs:

- `rules/et_1` to `rules/et_12`: Static DNR rules
- `Artifact.json`: Additional URL cleaning patterns for the History API method

Advanced users can modify these files to customize the extension's behavior.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project uses multiple licenses:

### GPLv3 License

The following files are completely under the GNU General Public License v3:

- `/content.js`
- `/panel/panelMenu.html`
- `common/rules.js`
- `panel/options.js`
- `panel/option.html`
- `/panel/style.css`
- `/Linkumori-Artifact/Artifact.json`
- `/rules/original/rules1.json` to `/rules/original/rules3.json`
- `/rules/original/rules8.json` to `/rules/original/rules11.json`

Copyright (c) 2024 Subham Mahesh

### Mixed License (GPLv3 and MIT)

The following files contain a mix of GPLv3 and MIT licensed code:

- `background.js`
- `common/constants.js`
- `common/utils.js`

GPLv3 portions: Copyright (c) 2024 Subham Mahesh
MIT portions: Copyright (c) 2022 Nick

### Derivative Work

Files `rules/adguard-modifed/rules5.json`, `rules/adguard-modifed/rules6.json`,`rules/adguard-modifed/rules12.json`
 and `rules/adguard-modifed/rules7.json`, `rules/adguard-modifed/rules4.json` are modified works:

- Original work: https://github.com/AdguardTeam/AdguardFilters/blob/master/TrackParamFilter/sections/specific.txt
- Original work license: GNU General Public License v3 only
- Derivative work: Also under GNU General Public License v3 only
- Copyright for modified part only (c) 2024 Subham Mahesh

For more information about modifications, please see `rules/adguard-modifed/notice.txt`.

### Font License

This project uses the Liberation Serif Regular font, which is licensed under the SIL Open Font License, Version 1.1. The font is located in the `./liberation-fonts` directory.

### Creative Commons License

The following files are licensed under the Creative Commons Attribution 4.0 International License:
- `icons/icon48.png`
- `icons/icon96.png`
- `icons/icon128.png`

Copyright (c) 2024 Subham Mahesh

### Font Awesome Icons

This project uses the Screwdriver Wrench icon from Font Awesome Free, which is licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
- Icon: Screwdriver Wrench
- View Original Source of advanced-tools-dark.svg: https://fontawesome.com/icons/screwdriver-wrench?f=classic&s=solid&pc=%23ffffff&sc=%23FFD43B%2F

- View Original Source of Sourceadvanced-tools-light.svg: https://fontawesome.com/icons/screwdriver-wrench?f=classic&s=solid&pc=%23334155&sc=%23FFD43B%2F
-  icon locations in linkumori source code:
  - `/panel/advanced-tools-dark.svg`
  - `/panel/advanced-tools-light.svg`
- Copyright: © 2024 Fonticons, Inc.


### Unmodified MPL 2.0 licensed works 
The Linkumori (URLs Purifier) extension incorporates MPL 2.0 licensed code from the MDN Web Extensions repository, specifically the clipboard-helper.js file (original source: https://github.com/mdn/webextensions-examples/blob/main/context-menu-copy-link-with-types/clipboard-helper.js). This code is located at './clipboard-helper.js' within the Linkumori extension. In accordance with MPL 2.0 Section 3.3, recipients of this larger work have the option to receive and use this specific file under either the terms of the Mozilla Public License 2.0 or alternatively under the GNU General Public License version 3. This dual-licensing option applies exclusively to the clipboard-helper.js file and does not extend to other components of the Linkumori extension. Recipients must comply with the terms of whichever license they choose (MPL 2.0 or GPL v3) for this specific file, including maintaining appropriate notices and making the source code available as required by the chosen license.

## Acknowledgments

- Based on the ERASER project by Nick (https://github.com/Psychosynthesis/Eraser/)
- Uses rules derived from AdguardTeam's AdguardFilters (https://github.com/AdguardTeam/AdguardFilters)
- Inspired by the need for greater privacy in online browsing

## Disclaimer

Linkumori is provided "as is" without warranty of any kind. Use at your own risk.

For full license texts, please see the [LICENSE](LICENSE) file in the project repository.
