let selectedText = "";
let selectedRange = null;
let summaryPopup = null;
let stylesAdded = false;

// Initialize extension
console.log("UzSummarize: Content script loaded");
chrome.runtime.sendMessage({ action: "contentScriptReady" });

// Cache styles creation
const createStyles = () => {
  if (stylesAdded) return;

  const styles = document.createElement("style");
  styles.id = "uzsummarize-styles";
  styles.textContent = `
    .uzsummarize-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      max-height: 80vh;
      background: var(--bg-color, #fff);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      z-index: 2147483647;
      font-family: system-ui, -apple-system, sans-serif;
      color: var(--text-color, #000);
      animation: fadeIn 0.5s ease-out;
      padding: 24px;
      overflow: hidden;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, -45%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    }

    .uzsummarize-header {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 0.5rem;
    }

    @media (min-width: 640px) {
      .uzsummarize-header {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
    }

    .uzsummarize-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }

    .uzsummarize-title-text {
      font-size: 1.25rem;
      font-weight: 500;
      background: linear-gradient(to right, #0066FF, rgba(0, 102, 255, 0.7));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .uzsummarize-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .uzsummarize-copy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 8px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 9999px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.2s;
    }

    .uzsummarize-copy:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .uzsummarize-copy:active {
      transform: scale(0.97);
    }

    .uzsummarize-copy svg {
      width: 20px;
      height: 20px;
    }

    .uzsummarize-close {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 6px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 9999px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.6);
      transition: all 0.2s;
      z-index: 10;
    }

    .uzsummarize-close:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }

    .uzsummarize-close:active {
      transform: scale(0.95);
    }

    .uzsummarize-close svg {
      width: 20px;
      height: 20px;
    }

    .uzsummarize-content {
      position: relative;
      background: var(--bg-color, #fff);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: box-shadow 0.3s;
      animation: slideUp 0.5s ease-out 0.2s both;
    }

    .uzsummarize-content:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
    }

    .uzsummarize-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, rgba(0, 102, 255, 0.2), #0066FF, rgba(0, 102, 255, 0.2));
      border-radius: 12px 12px 0 0;
      transform-origin: left;
      animation: progressLine 0.8s ease-out 0.4s both;
    }

    @keyframes progressLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .uzsummarize-text {
      white-space: pre-wrap;
      line-height: 1.6;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      margin: 0;
    }

    .uzsummarize-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      gap: 16px;
    }

    .uzsummarize-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(0, 102, 255, 0.1);
      border-top: 3px solid #0066FF;
      border-radius: 50%;
      animation: spinner 0.8s linear infinite;
    }

    .uzsummarize-loading p {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }

    @keyframes spinner {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styles);
  stylesAdded = true;
};

// Check if extension context is valid
function isExtensionContextValid() {
  try {
    // Try to access chrome.runtime, which throws if context is invalid
    return !!chrome.runtime.id;
  } catch {
    return false;
  }
}

// Wrapper for sending messages to background script
async function sendMessageToBackground(message) {
  if (!isExtensionContextValid()) {
    console.log("Extension context invalidated, reloading page...");
    window.location.reload();
    return;
  }

  try {
    return await chrome.runtime.sendMessage(message);
  } catch (error) {
    if (error.message.includes("Extension context invalidated")) {
      console.log("Extension context invalidated, reloading page...");
      window.location.reload();
    } else {
      console.error("Error sending message:", error);
    }
  }
}

// Update existing message sending code
document.addEventListener("selectionchange", async () => {
  const selection = window.getSelection();
  const text = selection?.toString()?.trim();

  if (text) {
    selectedText = text;
    selectedRange =
      selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    try {
      await sendMessageToBackground({
        action: "textSelected",
        text,
      });
    } catch (error) {
      console.log("Failed to notify about text selection:", error);
    }
  }
});

// Handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!isExtensionContextValid()) {
    console.log("Extension context invalidated, reloading page...");
    window.location.reload();
    return;
  }

  switch (request.action) {
    case "getSelectedText":
      sendResponse({
        text: window.getSelection()?.toString()?.trim() || selectedText,
        success: true,
      });
      break;

    case "showSummary":
      showSummaryPopup(request.summary);
      sendResponse({ success: true });
      break;

    case "showError":
      showErrorPopup(request.error);
      sendResponse({ success: true });
      break;

    case "contextMenuClicked":
      showLoadingPopup();
      sendResponse({ success: true });
      break;

    case "regenerate":
      showLoadingPopup();
      sendResponse({ success: true });
      break;

    default:
      sendResponse({ success: false, error: "Unknown action" });
  }
  return false;
});

// Optimized text selection handler
const selectionHandler = (event) => {
  if (isClickInsidePopup(event.target)) return;

  const selection = window.getSelection();
  const text = selection?.toString()?.trim();

  if (text) {
    selectedText = text;
    selectedRange =
      selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    chrome.runtime
      .sendMessage({
        action: "textSelected",
        text,
      })
      .catch(() => {
        console.log("Extension context invalidated");
      });
  }
};

document.addEventListener("mouseup", selectionHandler);

// Optimized popup functions
const showLoadingPopup = () => {
  createStyles();
  showPopup(
    "Loading",
    `
    <div class="uzsummarize-loading">
      <div class="uzsummarize-spinner"></div>
      <p>Xulosa olinyapti...</p>
    </div>
  `,
    false,
    true
  );
};

const showErrorPopup = (error) => {
  createStyles();
  showPopup("Error", error, true);
};

const showSummaryPopup = (summary) => {
  createStyles();
  showPopup("Summary", summary);
};

// Update closePopup function
function closePopup() {
  if (summaryPopup) {
    document.body.removeChild(summaryPopup);
    summaryPopup = null;
  }
}

// Handle keyboard shortcut
document.addEventListener("keydown", async (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
    const selection = window.getSelection();
    const text = selection?.toString()?.trim();

    if (text) {
      // Show loading state immediately
      createStyles();
      summaryPopup = document.createElement("div");
      summaryPopup.className = "uzsummarize-popup";
      summaryPopup.innerHTML = `
        <button class="uzsummarize-close" title="Yopish">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="uzsummarize-header">
          <div class="uzsummarize-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <h3 class="uzsummarize-title-text">Xulosa olinyapti...</h3>
          </div>
        </div>
        <div class="uzsummarize-loading">
          <div class="uzsummarize-spinner"></div>
          <p>Iltimos, kuting...</p>
        </div>
      `;

      document.body.appendChild(summaryPopup);

      // Add close button event listener
      const closeBtn = summaryPopup.querySelector(".uzsummarize-close");
      closeBtn.addEventListener("click", closePopup);

      // Add escape key handler
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape") {
            closePopup();
          }
        },
        { once: true }
      );

      try {
        const response = await fetch("https://uzsummarize.uz/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error("Failed to summarize text");
        }

        const data = await response.json();
        if (data.error) {
          showPopup("Xatolik", data.error, true);
        } else {
          showPopup("Xulosa", data.summary);
        }
      } catch (error) {
        console.error("Error:", error);
        showPopup("Xatolik", "Xulosa olishda xatolik yuz berdi", true);
      }
    } else {
      showPopup("Ogohlantirish", "Matn tanlanmagan", true);
    }
  }
});

// Update showPopup function to handle loading state better
function showPopup(title, content, isError = false, isLoading = false) {
  if (summaryPopup) {
    closePopup();
  }

  summaryPopup = document.createElement("div");
  summaryPopup.className = "uzsummarize-popup";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      const copyButton = summaryPopup.querySelector(".uzsummarize-copy");
      copyButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      copyButton.style.color = "#22c55e";
      setTimeout(() => {
        copyButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyButton.style.color = "";
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  if (isLoading) {
    summaryPopup.innerHTML = `
      <button class="uzsummarize-close" title="Yopish">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <div class="uzsummarize-loading">
        <div class="uzsummarize-spinner"></div>
        <p>Xulosa olinyapti...</p>
      </div>
    `;
  } else {
    summaryPopup.innerHTML = `
      <button class="uzsummarize-close" title="Yopish">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <div class="uzsummarize-header">
        <div class="uzsummarize-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <h3 class="uzsummarize-title-text">Xulosa Natijasi</h3>
        </div>
        <div class="uzsummarize-controls">
          <button class="uzsummarize-copy" title="Nusxa olish">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </div>
      <div class="uzsummarize-content">
        <p class="uzsummarize-text">${content}</p>
      </div>
    `;

    const copyBtn = summaryPopup.querySelector(".uzsummarize-copy");
    copyBtn.addEventListener("click", handleCopy);
  }

  document.body.appendChild(summaryPopup);

  // Add close button event listener
  const closeBtn = summaryPopup.querySelector(".uzsummarize-close");
  closeBtn.addEventListener("click", closePopup);

  // Keep escape key handler
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    },
    { once: true }
  );
}

// Check if element is inside our popup
function isClickInsidePopup(element) {
  return element?.closest(".uzsummarize-popup") !== null;
}
