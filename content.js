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
        dl { display: grid; grid-template-columns: auto auto; }
        dt { text-align: left; font-weight: bold; }
        dd { text-align: right; }
      }
      </style>
      <h2>Amplience Hotkeys</h2>
      <hr />
      <dl>
        <dt>Ctrl/Cmd + A</dt>
        <dd>Select all items</dd>
        <dt>Escape</dt>
        <dd>Deselect all items</dd>
        <dt>E</dt>
        <dd>Archive selected items</dd>
        <dt>F</dt>
        <dd>Open filters panel</dd>
        <dt>Ctrl/Cmd + F</dt>
        <dd>Focus search input</dd>
        <dt>H or ?</dt>
        <dd>Show this help overlay</dd>
      </dl>
      <hr />
      <p>Numbers take you to the corresponding top-level menu items</p>
      <hr />
      <p>Click anywhere or press any key to close this overlay.</p>
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

  // Open filters panel with F
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
