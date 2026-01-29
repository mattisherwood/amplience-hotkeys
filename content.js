// Amplience Hotkeys - Content Script
// Listen for keyboard events on Amplience content pages
document.addEventListener("keydown", (event) => {
  // Skip all other hotkeys if user is typing in an input field
  if (isTypingInInput()) return

  // Apply listing-specific hotkeys
  const isInListing = document.querySelector("am-content-item-library") !== null
  if (isInListing) applyListingHotkeys(event)

  // Apply editor-specific hotkeys
  const isInEditor = document.querySelector("am-content-item-editor") !== null
  if (isInEditor) applyEditorHotkeys(event)

  // Always apply global hotkeys
  applyGlobalHotkeys(event)
})

const applyListingHotkeys = (event) => {
  // ================ ESCAPE =================
  if (event.key === "Escape") {
    // If the Create Content modal is open, close it
    const isCreateContentModalOpen =
      document.querySelector('[aria-label="Choose a content type"]') !== null
    if (isCreateContentModalOpen) {
      clickButton(".am-browser-close-button", event)
      return
    }

    // Otherwise deselect all items
    const selectAllCheckbox = document.querySelector(
      "am-select-all md-checkbox",
    )
    if (selectAllCheckbox) {
      if (selectAllCheckbox.classList.contains("md-indeterminate")) {
        selectAllCheckbox.click()
        event.preventDefault()
      }
      if (selectAllCheckbox.classList.contains("md-checked")) {
        selectAllCheckbox.click()
        event.preventDefault()
        return
      }
    }
  }

  // =================== A ===================
  if (!isCtrlOrCmd(event) && ["a", "A"].includes(event.key)) {
    // Assign User to selected items
    clickButton("am-bulk-assign-users button", event)
    return
  }

  // ============= CTRL/CMD + A ==============
  if (isCtrlOrCmd(event) && ["a", "A"].includes(event.key)) {
    // Select all items
    const selectAllCheckbox = document.querySelector(
      "am-select-all md-checkbox",
    )
    if (
      selectAllCheckbox &&
      selectAllCheckbox.classList.contains("md-checked") === false
    ) {
      selectAllCheckbox.click()
      event.preventDefault() // Prevent default select all behavior
    }
  }

  // =================== C ===================
  if (!isCtrlOrCmd(event) && ["c", "C"].includes(event.key)) {
    // Create new content item
    clickButton('[am-id="am-content-item-library__create-btn--content"]', event)
    return
  }

  // =================== D ===================
  if (!isCtrlOrCmd(event) && ["d", "D"].includes(event.key)) {
    // Duplicate selected items
    clickButton('[am-id="am-bulk-action-copy"]', event)
    return
  }

  // =================== E ===================
  if (!isCtrlOrCmd(event) && ["e", "E"].includes(event.key)) {
    // Archive selected items
    clickButton(".am-bulk-action-controls__button--archive", event)
    return
  }

  // =================== F ===================
  if (!isCtrlOrCmd(event) && ["f", "F"].includes(event.key)) {
    // Open/Close filters panel
    clickButton(".am-inline-filters__button", event)
    return
  }

  // ============= CTRL/CMD + F ==============
  if (isCtrlOrCmd(event) && ["f", "F"].includes(event.key)) {
    // Focus search input
    // Find the modal search input if that's open, or fall back to global search input
    const input =
      document.querySelector(
        '[aria-label="Choose a content type"] am-search-box input',
      ) || document.querySelector("am-search-box input")
    if (input) {
      input.focus()
      event.preventDefault()
      return
    }
  }

  // =================== L ===================
  if (!isCtrlOrCmd(event) && ["l", "L"].includes(event.key)) {
    // Localize selected items
    clickButton("am-bulk-assign-locale button", event)
    return
  }

  // =================== P ===================
  if (!isCtrlOrCmd(event) && ["p", "P"].includes(event.key)) {
    // Publish selected items
    clickButton('[am-id="am-bulk-action-publish"]', event)
    return
  }

  // =================== U ===================
  if (!isCtrlOrCmd(event) && ["u", "U"].includes(event.key)) {
    // Unarchive selected items
    if (clickButton(".am-bulk-action-controls__button--unarchive", event))
      return
  }

  // =================== V ===================
  if (!isCtrlOrCmd(event) && ["v", "V"].includes(event.key)) {
    // Toggle view mode between list and grid
    const gridButton = document.querySelector(
      '[am-id="planning__sub-nav__grid-button"]',
    )
    const listButton = document.querySelector(
      '[am-id="planning__sub-nav__list-button"]',
    )
    if (gridButton && listButton) {
      const isGridView = gridButton.classList.contains("active")
      if (isGridView) {
        listButton.click()
      } else {
        gridButton.click()
      }
      event.preventDefault()
      return
    }
  }

  // =================== → ===================
  if (event.key === "ArrowRight") {
    // Go to next page of items
    clickButton('[am-id="content-pagination--next"]', event)
    return
  }

  // =================== ← ===================
  if (event.key === "ArrowLeft") {
    // Go to previous page of items
    clickButton('[am-id="content-pagination--prev"]', event)
    return
  }
}

const applyEditorHotkeys = (event) => {
  // ================ ESCAPE =================
  if (event.key === "Escape") {
    // Cancel editing and go back
    clickButton('[am-id="am-editor-action-controls__btn--back"]', event)
    return
  }

  // =================== A ===================
  if (!isCtrlOrCmd(event) && ["a", "A"].includes(event.key)) {
    // Assign User to current item
    clickButton(".am-workflow-assignee-chooser__btn", event)
    return
  }

  // =================== D ===================
  if (!isCtrlOrCmd(event) && ["d", "D"].includes(event.key)) {
    // Set delivery key
    clickButton('[am-id="am-editor-action-controls__btn--delivery-key"]', event)
    return
  }

  // =================== E ===================
  if (!isCtrlOrCmd(event) && ["e", "E"].includes(event.key)) {
    // Archive current item
    clickButton(
      '[am-id="am-editor-action-controls__btn--archive"], [am-id="am-editor-action-controls__btn--unpublish-and-archive"]',
      event,
    )
    return
  }

  // =================== H ===================
  if (!isCtrlOrCmd(event) && ["h", "H"].includes(event.key)) {
    // Show/hide History panel
    clickButton(
      '[am-id="am-content-item-editor-toolbar__action--history"] button',
      event,
    )
    return
  }

  // =================== I ===================
  if (!isCtrlOrCmd(event) && ["i", "I"].includes(event.key)) {
    // Show/hide Info panel
    clickButton(
      '[am-id="am-content-item-editor-toolbar__action--props"] button',
      event,
    )
    return
  }

  // =================== L ===================
  if (!isCtrlOrCmd(event) && ["l", "L"].includes(event.key)) {
    // Localize current item
    clickButton('[am-id="am-editor-action-controls__btn--set-locale"]', event)
    return
  }

  // =================== P ===================
  if (!isCtrlOrCmd(event) && ["p", "P"].includes(event.key)) {
    // Publish current item
    clickButton('[am-id="am-bulk-action-publish"]', event)
    return
  }

  // =================== S ===================
  if (!isCtrlOrCmd(event) && ["s", "S"].includes(event.key)) {
    // Show/hide Schedule panel
    clickButton(
      '[am-id="am-content-item-editor-toolbar__action--usage"] button',
      event,
    )
    return
  }

  // ============= CTRL/CMD + S ==============
  if (isCtrlOrCmd(event) && ["s", "S"].includes(event.key)) {
    // Save as a new item if shift is also pressed
    if (event.shiftKey) {
      clickButton('[am-id="am-editor-action-controls__btn--save-as"]', event)
      return
    }

    // Otherwise save changes to current item
    clickButton('[am-id="am-editor-action-controls__btn--save"]', event)
    return
  }

  // =================== V ===================
  if (!isCtrlOrCmd(event) && ["v", "V"].includes(event.key)) {
    // Show/hide Visualization panel
    clickButton(
      '[am-id="am-content-item-editor-toolbar__action--vis"] button',
      event,
    )
    return
  }
}

const applyGlobalHotkeys = (event) => {
  // =================== ? ===================
  if (!isCtrlOrCmd(event) && event.key === "?") {
    // Show help splash-screen overlay
    createHelpOverlay()
    event.preventDefault()
    return
  }

  // =================== Numbers 1-9 and 0 ===================
  if (!isCtrlOrCmd(event) && /^[0-9]$/.test(event.key)) {
    const numberKey = parseInt(event.key, 10)
    const index = numberKey === 0 ? 9 : numberKey - 1
    const topLevelMenuItems = document.querySelectorAll(
      '[name="mainMenu"] > md-menu-bar > button',
    )
    // Numbers 1-4 open the items on the top-level menu
    if (index >= 0 && index <= 3) {
      if (topLevelMenuItems[index]) {
        topLevelMenuItems[index].click()
        event.preventDefault()
      }
      return
    }
    // Numbers 5-9 and 0 open the menu items hidden in the "Developer" menu
    if (index >= 4 && index <= 9) {
      const developerMenuItems = document.querySelectorAll(
        ".masthead__mainMenu-button--list .am-masthead-menu__action",
      )
      const developerMenuIndex = index - 4
      if (developerMenuItems[developerMenuIndex]) {
        developerMenuItems[developerMenuIndex].click()
        event.preventDefault()
      }
    }
  }
}

/*
 * Helper function to check if user is typing in an input field
 * @returns {boolean} - True if the active element is an input, textarea, or contenteditable
 */
const isTypingInInput = () => {
  const activeElement = document.activeElement
  if (!activeElement) return false

  const tagName = activeElement.tagName.toLowerCase()
  const isInput = tagName === "input" || tagName === "textarea"
  const isContentEditable = activeElement.isContentEditable

  return isInput || isContentEditable
}

/*
 * Click a button specified by the selector if it exists and is not disabled
 * @param {string} selector - The CSS selector for the button
 * @param {KeyboardEvent} event - The keyboard event to prevent default action
 * @returns {boolean} - True if the button was clicked, false otherwise
 */
const clickButton = (selector, event) => {
  const button = document.querySelector(selector)
  if (button && !button.classList.contains("disabled")) {
    button.click()
    event.preventDefault()
    return true
  }
  return false
}

/*
 * Check if Ctrl (Windows/Linux) or Cmd (Mac) key is pressed
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean} - True if Ctrl or Cmd is pressed, false otherwise
 */
const isCtrlOrCmd = (event) => event.ctrlKey || event.metaKey

/*
 * Create and display a help overlay with hotkey information
 */
const createHelpOverlay = () => {
  const overlay = document.createElement("div")
  overlay.id = "hotkey-help-overlay"
  overlay.innerHTML = `<style>
    #hotkey-help-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 80%;
        max-height: calc(100vh - 80px);
        padding: 20px 40px;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        z-index: 10000;
        transform: translate(-50%, -50%);
        overflow: auto;

        .cols {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: max-content;
            max-width: 100%;

            div {
                border: solid 1px;
                border-radius: 10px;
                overflow: hidden;
            }
        }

        h3 {
            margin: 0;
            padding: 10px;
            background-color: #fff;
            color: #000;
        }

        h4 {
            text-align: right;
            border-bottom: solid 1px;
            color: #fff;
            padding-block: 5px;
            margin: 10px 20px 0;
        }

        dl {
            display: grid;
            position: relative;
            grid-template-columns: auto auto;
            margin: 5px 20px 20px;
        }

        dt,
        dd {
            padding: 5px 0;
        }

        dt {
            text-align: left;
            font-weight: bold;

            &:not(:first-child)::before {
                content: "";
                display: block;
                position: absolute;
                border-bottom: solid 1px #666;
                width: 100%;
                left: 0;
                margin-top: -5px;
            }
        }

        dd {
            text-align: right;
        }
    }

    @media (min-width: 700px) {
        #hotkey-help-overlay .cols {
            flex-direction: row;

            div {
                width: calc(33% - (40px / 3));
            }
        }
    }
</style>
<h2>Amplience Hotkeys</h2>
<div class="cols">
    <div>
        <h3>Global</h3>
        <h4>Navigation</h4>
        <dl>
            <dt>1</dt>
            <dd>Dashboard</dd>
            <dt>2</dt>
            <dd>Content</dd>
            <dt>3</dt>
            <dd>Assets</dd>
            <dt>4</dt>
            <dd>Scheduling</dd>
            <dt>5</dt>
            <dd>Content Type Schemas</dd>
            <dt>6</dt>
            <dd>Content Types</dd>
            <dt>7</dt>
            <dd>Extensions</dd>
            <dt>8</dt>
            <dd>Webhooks</dd>
            <dt>9</dt>
            <dd>Personal Access Tokens</dd>
            <dt>0</dt>
            <dd>Integrations</dd>
        </dl>
        <h4>Help</h4>
        <dl>
            <dt>?</dt>
            <dd>Show this help overlay</dd>
        </dl>
    </div>
    <div>
        <h3>Listing Page</h3>
        <h4>Actions</h4>
        <dl>
            <dt>A</dt>
            <dd>Assign a user to selected items</dd>
            <dt>C</dt>
            <dd>Create a content item</dd>
            <dt>D</dt>
            <dd>Duplicate selected items</dd>
            <dt>E</dt>
            <dd>Archive selected items</dd>
            <dt>L</dt>
            <dd>Localize selected items</dd>
            <dt>P</dt>
            <dd>Publish selected items</dd>
            <dt>U</dt>
            <dd>Unpublish or Unarchive selected items</dd>
        </dl>
        <h4>Interface</h4>
        <dl>
            <dt>F</dt>
            <dd>Show/hide Filters</dd>
            <dt>V</dt>
            <dd>Toggle View (list / grid)</dd>
            <dt>Ctrl + F</dt>
            <dd>Find</dd>
            <dt>→</dt>
            <dd>Next page</dd>
            <dt>←</dt>
            <dd>Previous page</dd>
        </dl>
        <h4>Selection</h4>
        <dl>
            <dt>Ctrl + A</dt>
            <dd>Select all items</dd>
            <dt>Esc</dt>
            <dd>Close modal or<br />Deselect all items</dd>
        </dl>
    </div>
    <div>
        <h3>Editor Page</h3>
        <h4>Actions</h4>
        <dl>
            <dt>A</dt>
            <dd>Assign a user</dd>
            <dt>D</dt>
            <dd>Set delivery key</dd>
            <dt>E</dt>
            <dd>Archive item</dd>
            <dt>L</dt>
            <dd>Localize item</dd>
            <dt>P</dt>
            <dd>Publish item</dd>
            <dt>U</dt>
            <dd>Unpublish or Unarchive item</dd>
            <dt>Ctrl + S</dt>
            <dd>Save</dd>
            <dt>Ctrl + Shift+S</dt>
            <dd>Save as...</dd>
            <dt>Esc</dt>
            <dd>Cancel editing</dd>
        </dl>
        <h4>Interface</h4>
        <dl>
            <dt>H</dt>
            <dd>Show/hide History panel</dd>
            <dt>I</dt>
            <dd>Show/hide Info (props) panel</dd>
            <dt>S</dt>
            <dd>Show/hide Scheduling panel</dd>
            <dt>V</dt>
            <dd>Show/hide Visualization panel</dd>
        </dl>
    </div>
</div>
<p style="color: #ccc">Click anywhere or press any key to close this overlay.</p>
    `

  // Add event listener to remove overlay on click or key press
  const removeOverlay = () => {
    const existingOverlay = document.getElementById("hotkey-help-overlay")
    if (existingOverlay) {
      existingOverlay.remove()
    }
    document.removeEventListener("click", removeOverlay)
    document.removeEventListener("keydown", removeOverlay)
  }
  document.addEventListener("click", removeOverlay)
  document.addEventListener("keydown", removeOverlay)

  // Append overlay to body
  document.body.appendChild(overlay)
}
