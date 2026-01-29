# Amplience Hotkeys

A Chrome extension that adds keyboard shortcuts to the Amplience Dynamic Content platform, making content management faster and more efficient.

## Features

- 🎹 **Keyboard shortcuts** for common actions in Amplience
- 🚀 **Quick navigation** to menu items using number keys
- 💡 **Built-in help overlay** to view all available shortcuts
- 🛡️ **Smart input detection** - hotkeys are disabled when typing in text fields (except Escape)

## Installation

1. Download or clone this repository

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (top right)

4. Click **Load unpacked**

5. Select the `amplience-hotkeys` folder you downloaded in step 1

The extension will now be active on `https://app.amplience.net/content/*`

![Installing Custom Browser Extensions](screenshots/installing-custom-browser-extensions.gif)\
_Here are steps 2-5 in action. (Also installing our two other browser extensions - [Amplience Patches](https://github.com/mattisherwood/amplience-patches) and [Favicon Swapper](https://github.com/mattisherwood/favicon-swapper))_

_**TIP:** While you're in the extension manager; if you click **Details** on the extension you can select **'Allow in Icongito'** if you wish it to also be applied to incognito windows._

### Updating to newer versions

If you wish to update the extension, merely re-run the above steps but upload the newer version of the folder. It will automatically replace the old one. Then refresh the tab and it'll be applied.

## Available Hotkeys

### Global

|     | Navigation (follows top-nav) |
| --- | ---------------------------- |
| 1   | Dashboard                    |
| 2   | Content                      |
| 3   | Assets                       |
| 4   | Scheduling                   |
| 5   | Content Type Schemas         |
| 6   | Content Types                |
| 7   | Extensions                   |
| 8   | Webhooks                     |
| 9   | Personal Access Tokens       |
| 0   | Integrations                 |

|     | Help                            |
| --- | ------------------------------- |
| ?   | Show overlay with all shortcuts |

### Listing Page

|     | Actions                               |
| --- | ------------------------------------- |
| A   | Assign a user to selected Items       |
| C   | Create a content item                 |
| D   | Duplicate selected items              |
| E   | Archive selected items                |
| L   | Localize selected items               |
| P   | Publish selected items                |
| U   | Unpublish or Unarchive selected items |

|          | Interface                 |
| -------- | ------------------------- |
| F        | Show/hide Filters         |
| V        | Toggle View (list / grid) |
| Ctrl + F | Find                      |
| →        | Next page                 |
| ←        | Previous page             |

|          | Selection                         |
| -------- | --------------------------------- |
| Ctrl + A | Select all items                  |
| Esc      | Close modal or Deselect all items |

### Editor Page

|                  | Actions                     |
| ---------------- | --------------------------- |
| A                | Assign a user               |
| D                | Set delivery key            |
| E                | Archive item                |
| L                | Localize item               |
| P                | Publish item                |
| U                | Unpublish or Unarchive item |
| Ctrl + S         | Save                        |
| Ctrl + Shift + S | Save as...                  |
| Esc              | Cancel editing              |

|     | Interface                     |
| --- | ----------------------------- |
| H   | Show/hide History panel       |
| I   | Show/hide Info (props) panel  |
| S   | Show/hide Scheduling panel    |
| V   | Show/hide Visualization panel |

## Usage Tips

- Remember you can press **?** at anytime to view the help overlay
- Hotkeys are automatically disabled when typing in input fields to prevent accidental actions

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

### v1.3

- Drop **A** for navigating to archive
- Make **A** consistently "Assign user"\
  _(NB: There is still a known bug with the core assign-user button)_
- Add **D** for Duplicate
- Add **L** for Localize
- Standardise to match across listing and editor pages where possible
- Group hotkeys into Global / Listing Page / Editor Page contexts
- Update help files to reflect that

### v1.2.1

- Allow Ctrl+numbers to still do their usual jobs\
  (e.g. Ctrl+0 resets the zoom)

### v1.2

- Add **C** to create a new content item
- Update/limit hotkeys when createContent modal is open
- Add **S _or_ Ctrl / Cmd + S** to save content item

### v1.1

- Add **A** to navigate to archive
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
