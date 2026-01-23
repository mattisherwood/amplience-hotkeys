// Amplience Hotkeys - Content Script
// Listen for keyboard events on Amplience content pages

// Helper function to check if user is typing in an input field
function isTypingInInput() {
  const activeElement = document.activeElement
  if (!activeElement) return false

  const tagName = activeElement.tagName.toLowerCase()
  const isInput = tagName === "input" || tagName === "textarea"
  const isContentEditable = activeElement.isContentEditable

  return isInput || isContentEditable
}

document.addEventListener("keydown", (event) => {
  // Allow Escape key even when typing in an input
  const isEscapeKey = event.key === "Escape"

  // Skip all other hotkeys if user is typing in an input field
  if (!isEscapeKey && isTypingInInput()) {
    return
  }
  // Show a help splash-screen overlay if "H" key is pressed
  if (event.key === "h" || event.key === "H" || event.key === "?") {
    // Create overlay element
    // It has rounded corners and a semi-transparent black background and white text
    const overlay = document.createElement("div")
    overlay.id = "hotkey-help-overlay"
    overlay.style.position = "fixed"
    overlay.style.top = "50%"
    overlay.style.left = "50%"
    overlay.style.transform = "translate(-50%, -50%)"
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
    overlay.style.color = "white"
    overlay.style.padding = "20px 40px"
    overlay.style.borderRadius = "10px"
    overlay.style.zIndex = "10000"
    overlay.style.fontSize = "16px"
    overlay.style.maxWidth = "80%"
    overlay.style.minWidth = "360px"
    overlay.style.textAlign = "center"
    overlay.innerHTML = `
      <style>
      #hotkey-help-overlay {
        h3 {
          text-align: right;
          border-block: solid 1px #666;
          color: #ccc;
          padding-block: 5px;
        }
        dl { display: grid; grid-template-columns: auto auto; }
        dt { text-align: left; font-weight: bold; }
        dd { text-align: right; }
      }
      </style>
      <h2>Amplience Hotkeys</h2>
      <h3>Selection Hotkeys</h3>
      <dl>
        <dt>Ctrl/Cmd + A</dt>
        <dd>Select all items</dd>
        <dt>Escape</dt>
        <dd>Deselect all items</dd>
      </dl>
      <h3>Action Hotkeys</h3>
      <dl>
        <dt>C</dt>
        <dd>Create a content item</dd>
        <dt>E</dt>
        <dd>Archive selected items</dd>
        <dt>P</dt>
        <dd>Publish selected items</dd>
        <dt>S or Ctrl/Cmd + S</dt>
        <dd>Save changes to the current item</dd>
        <dt>U</dt>
        <dd>Unarchive selected items <em>(if in archive)</em><br/>
        Assign a User to selected items <em>(if not in archive)</em></dd>
      </dl>
        <h3>Interface Hotkeys</h3>
      <dl>
        <dt>F</dt>
        <dd>Toggle filters panel</dd>
        <dt>Ctrl/Cmd + F</dt>
        <dd>Focus search input</dd>
      </dl>
        <h3>Navigation Hotkeys</h3>
      <dl>
        <dt>1-4</dt>
        <dd>Open corresponding top-level menu items</dd>
        <dt>5-9, 0</dt>
        <dd>Open corresponding items in "Developer" menu</dd>
        <dt>A</dt>
        <dd>Open the Archive of the current repository</dd>
      </dl>
        <h3>Help Hotkeys</h3>
      <dl>
        <dt>H or ?</dt>
        <dd>Show this help overlay</dd>
      </dl>
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

  // Only allow specific hotkeys when the create content modal is open
  const createContentModal = document.querySelector(
    '[aria-label="Choose a content type"]',
  )
  if (createContentModal) {
    if (event.key === "Escape") {
      // If the Create Content modal is open, close it instead of deselecting items
      const closeButton = createContentModal.querySelector(
        ".am-browser-close-button",
      )
      if (closeButton) {
        closeButton.click()
        event.preventDefault() // Prevent default behavior
      }
    }

    // Focus search input with Ctrl/Cmd + F
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "f" || event.key === "F")
    ) {
      const searchInput = createContentModal.querySelector(
        "am-search-box input",
      )
      if (searchInput) {
        searchInput.focus()
        event.preventDefault() // Prevent default behavior
      }
    }
    return // Important so it doesn't trigger other hotkeys
  }

  // Select all items with Ctrl+A or Cmd+A
  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === "a" || event.key === "A")
  ) {
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

  // Deselect all items with Escape key
  if (event.key === "Escape") {
    const selectAllCheckbox = document.querySelector(
      "am-select-all md-checkbox",
    )
    if (selectAllCheckbox) {
      if (selectAllCheckbox.classList.contains("md-indeterminate")) {
        selectAllCheckbox.click()
        event.preventDefault() // Prevent default select all behavior
      }
      if (selectAllCheckbox.classList.contains("md-checked")) {
        selectAllCheckbox.click()
        event.preventDefault() // Prevent default select all behavior
      }
    }
  }

  // Create new content item with C
  if (event.key === "c" || event.key === "C") {
    const createButton = document.querySelector(
      '[am-id="am-content-item-library__create-btn--content"]',
    )
    if (createButton) {
      createButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Archive selected items with E
  if (event.key === "e" || event.key === "E") {
    const archiveButton = document.querySelector(
      ".am-bulk-action-controls__button--archive",
    )
    if (archiveButton && !archiveButton.classList.contains("disabled")) {
      archiveButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Unarchive selected items with U (if in archive)
  // Assign User to selected items with U (if not in archive)
  if (event.key === "u" || event.key === "U") {
    const unarchiveButton = document.querySelector(
      ".am-bulk-action-controls__button--unarchive",
    )
    const assignUserButton = document.querySelector(
      ".am-workflow-assignee-chooser__btn",
    )
    if (unarchiveButton && !unarchiveButton.classList.contains("disabled")) {
      unarchiveButton.click()
      event.preventDefault() // Prevent default behavior
    } else if (
      assignUserButton &&
      !assignUserButton.classList.contains("disabled")
    ) {
      assignUserButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Save changes to the current item with S
  if (event.key === "s" || event.key === "S") {
    const saveButton = document.querySelector(
      '[am-id="am-editor-action-controls__btn--save"]',
    )
    if (saveButton && !saveButton.classList.contains("disabled")) {
      saveButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Publish selected items with P
  if (event.key === "p" || event.key === "P") {
    const publishButton = document.querySelector(
      '[am-id="am-editor-action-controls__btn--save"], [am-id="am-bulk-action-publish"]',
    )
    if (publishButton && !publishButton.classList.contains("disabled")) {
      publishButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Open archive of current repository with A
  if (event.key === "a" || event.key === "A") {
    const repoArchiveButton = document.querySelector(
      ".am-repository--selected + am-content-folders > am-content-folders-tree > ul > li:last-child > .leaf-folder",
    )
    if (repoArchiveButton) {
      repoArchiveButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Open/Close filters panel with F
  if (
    !event.ctrlKey &&
    !event.metaKey &&
    (event.key === "f" || event.key === "F")
  ) {
    const filtersButton = document.querySelector(".am-inline-filters__button")
    if (filtersButton) {
      filtersButton.click()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Focus search input with Ctrl/Cmd + F
  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === "f" || event.key === "F")
  ) {
    const searchInput = document.querySelector("am-search-box input")
    if (searchInput) {
      searchInput.focus()
      event.preventDefault() // Prevent default behavior
    }
  }

  // Shortcut numbers 1-9 and 0 to open corresponding menu items
  const numberKey = parseInt(event.key, 10)
  const index = numberKey === 0 ? 9 : numberKey - 1
  const topLevelMenuItems = document.querySelectorAll(
    '[name="mainMenu"] > md-menu-bar > button',
  )
  // Numbers 1-4 are on the top-level menu
  if (index >= 0 && index <= 3) {
    if (topLevelMenuItems[index]) {
      topLevelMenuItems[index].click()
      event.preventDefault() // Prevent default behavior
    }
  }
  // Numbers 5-9 and 0 are hidden in the "Developer" menu
  if (index >= 4 && index <= 9) {
    const developerMenuItems = document.querySelectorAll(
      ".masthead__mainMenu-button--list .am-masthead-menu__action",
    )
    const developerMenuIndex = index - 4
    if (developerMenuItems[developerMenuIndex]) {
      developerMenuItems[developerMenuIndex].click()
      event.preventDefault() // Prevent default behavior
    }
  }
})
