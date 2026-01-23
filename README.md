# Amplience Hotkeys

A Chrome extension that adds keyboard shortcuts to the Amplience Dynamic Content platform, making content management faster and more efficient.

## Features

- 🎹 **Keyboard shortcuts** for common actions in Amplience
- 🚀 **Quick navigation** to menu items using number keys
- 💡 **Built-in help overlay** to view all available shortcuts
- 🛡️ **Smart input detection** - hotkeys are disabled when typing in text fields (except Escape)

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right corner)
4. Click **Load unpacked**
5. Select the `amplience-hotkeys` folder
6. The extension will now be active on `https://app.amplience.net/content/*`

## Available Hotkeys

| Shortcut              | Action                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
|                       |                                                                                                       |
| **Ctrl/Cmd+A**        | Select all items in the content list                                                                  |
| **Escape**            | Deselect all items (works even in input fields)                                                       |
|                       |                                                                                                       |
| **C**                 | Create a new content item                                                                             |
| **E**                 | Archive selected items                                                                                |
| **P**                 | Publish selected items                                                                                |
| **U**                 | Unarchive selected items _(If in archive)_<br />Assign a User to selected items _(If not in archive)_ |
| **S _or_ Ctrl/Cmd+S** | Save current item                                                                                     |
|                       |                                                                                                       |
| **F**                 | Open/toggle the filters panel                                                                         |
| **Ctrl/Cmd+F**        | Focus the search input box                                                                            |
|                       |                                                                                                       |
| **1-4**               | Navigate to top-level menu items (Content, Media, Events, Settings)                                   |
| **5-9, 0**            | Navigate to developer menu items                                                                      |
| **A**                 | Open the Archive of the current repository                                                            |
|                       |                                                                                                       |
| **H** _or_ **?**      | Show help overlay with all shortcuts                                                                  |

## Usage Tips

- Press **H** or **?** anytime to view the help overlay
- Hotkeys are automatically disabled when typing in input fields to prevent accidental actions
- The **Escape** key always works, even in input fields, to quickly deselect items
- Number keys provide quick access to navigation menu items

## Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Chromium-based)
- ✅ Brave Browser
- ✅ Any Chromium-based browser that supports Manifest V3

## Development

### Project Structure

```
amplience-hotkeys/
├── manifest.json       # Extension configuration
├── content.js          # Main content script with hotkey logic
├── icons/              # Extension icons (16x16, 32x32, 96x96)
└── README.md          # This file
```

### Adding New Hotkeys

1. Open `content.js`
2. Add a new event listener block following the existing pattern
3. Use the `isTypingInInput()` helper to respect input field focus
4. Update the help overlay in the `"h"` or `"H"` key handler
5. Reload the extension in Chrome to test

### Code Guidelines

- All hotkeys should check for input field focus (except Escape)
- Use `.querySelector()` to find DOM elements
- Prevent default browser behavior with `event.preventDefault()`
- Add descriptive comments for each hotkey action

## Permissions

This extension requires:

- `storage` - For future settings/preferences functionality
- `https://app.amplience.net/content*` - To run on Amplience content pages only

## Privacy

- This extension runs **only** on Amplience content pages
- No data is collected, stored, or transmitted
- All functionality is local to your browser
- No external API calls or tracking

## License

This is a utility extension for personal/internal use. Amplience is a trademark of Amplience Ltd.

## Contributing

Contributions are welcome! Please feel free to:

- Report bugs or request features via GitHub issues
- Submit pull requests with improvements
- Share feedback on usability and additional shortcuts

## Support

For issues or questions:

1. Check the help overlay (press **H** or **?**)
2. Review this README
3. Open an issue on GitHub

## Changelog

### v1.2

- Add **C** to create a new content item
- Update/limit hotkeys when createContent modal is open
- Add **S _or_ Ctrl / Cmd + S** to save content item

### v1.1

- Add **A** to navigate to archive selected items
- Add **P** to publish selected items
- Add **U** to
  - unarchive selected items _(if in archive)_
  - assign User to selected items _(if not in archive)_
- Categorise hotkeys in the help files

### v1.0

- Initial release
- Selection/Deselection Hotkeys
  - **Ctrl / Cmd + A** to select all
  - **Esc** to deselect all
- Action Hotkeys
  - **E** to archive
- Interface Hotkeys
  - **F** to open/close the filters
  - **Ctrl / Cmd + F** to focus on the find input
- Help Hotkeys
  - **H** or **?** to show help
- Shortcuts
  - **Number keys** to open the corresponding top-level menu item

---

**Made with ❤️ for Amplience users**
