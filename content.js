// Amplience Hotkeys - Content Script
// Listen for keyboard events on Amplience content pages

document.addEventListener("keydown", (event) => {
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
    overlay.style.textAlign = "center"
    overlay.innerHTML = `
      <h2>Amplience Hotkeys</h2>
      <p><strong>Ctrl/Cmd + A</strong>: Select all items</p>
      <p><strong>Escape</strong>: Deselect all items</p>
      <p><strong>E</strong>: Archive selected items</p>
      <p><strong>F</strong>: Open filters panel</p>
      <p><strong>Ctrl/Cmd + F</strong>: Focus search input</p>
      <p><strong>H or ?</strong>: Show this help overlay</p>
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
})
