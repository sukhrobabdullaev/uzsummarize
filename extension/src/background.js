// Track tabs with content script loaded
const loadedTabs = new Set();

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("UzSummarize extension installed");

  // Create context menu item
  chrome.contextMenus.create({
    id: "summarizeSelection",
    title: "UzSummarize: Xulosa olish",
    contexts: ["selection"],
  });

  // Set default icon
  chrome.action.setIcon({
    path: {
      16: "icons/icon16.png",
      48: "icons/icon48.png",
      128: "icons/icon128.png",
    },
  });
});

// Inject content script if not already loaded
async function ensureContentScriptLoaded(tabId) {
  if (loadedTabs.has(tabId)) {
    return true;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["src/content.js"],
    });
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["src/content.css"],
    });
    loadedTabs.add(tabId);
    return true;
  } catch (error) {
    return false;
  }
}

// Check if extension context is valid
function isExtensionContextValid() {
  try {
    return !!chrome.runtime.id;
  } catch {
    return false;
  }
}

// Wrapper for sending messages to tabs
async function sendMessageToTab(tabId, message) {
  if (!isExtensionContextValid()) {
    console.log("Extension context invalidated");
    return;
  }

  try {
    return await chrome.tabs.sendMessage(tabId, message);
  } catch (error) {
    if (error.message.includes("Extension context invalidated")) {
      console.log("Extension context invalidated");
    } else {
      console.log("Error sending message to tab:", error);
    }
    throw error;
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (
    info.menuItemId === "summarizeSelection" &&
    info.selectionText &&
    tab.id !== chrome.tabs.TAB_ID_NONE
  ) {
    try {
      if (!isExtensionContextValid()) {
        console.log("Extension context invalidated");
        return;
      }

      // Show loading badge
      await chrome.action.setBadgeText({ text: "...", tabId: tab.id });
      await chrome.action.setBadgeBackgroundColor({
        color: "#0066FF",
        tabId: tab.id,
      });

      // Notify content script to show loading popup
      await sendMessageToTab(tab.id, { action: "contextMenuClicked" });

      if (await ensureContentScriptLoaded(tab.id)) {
        await summarizeText(info.selectionText, tab.id);
      }
    } catch (error) {
      console.log("Context menu error:", error);
      if (isExtensionContextValid()) {
        await chrome.action.setBadgeText({ text: "", tabId: tab.id });
      }
    }
  }
});

// Handle keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "summarize_selection") {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (
        tab &&
        tab.id !== chrome.tabs.TAB_ID_NONE &&
        (await ensureContentScriptLoaded(tab.id))
      ) {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "getSelectedText",
        });
        if (response && response.text) {
          await summarizeText(response.text, tab.id);
        }
      }
    } catch (error) {
      console.log("Keyboard command error:", error);
    }
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "contentScriptReady") {
    console.log("Content script ready on tab:", sender.tab.id);
    loadedTabs.add(sender.tab.id);
  } else if (request.action === "textSelected") {
    // Update the extension icon to indicate text is selected
    chrome.action.setIcon({
      path: {
        16: "icons/icon16-active.png",
        48: "icons/icon48-active.png",
        128: "icons/icon128-active.png",
      },
      tabId: sender.tab.id,
    });
  }
});

// Handle tab updates and removal
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    loadedTabs.delete(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  loadedTabs.delete(tabId);
});

// Function to handle text summarization
async function summarizeText(text, tabId) {
  if (!text || !tabId) {
    console.log("Invalid input:", { text: !!text, tabId: !!tabId });
    return;
  }

  try {
    if (!isExtensionContextValid()) {
      console.log("Extension context invalidated");
      return;
    }

    let apiUrl = "https://uzsummarize.uz/api/summarize";
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        language: "uz",
      }),
    });

 
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.summary) {
      throw new Error("No summary received from API");
    }

    if (isExtensionContextValid()) {
      // Clear loading badge
      await chrome.action.setBadgeText({ text: "", tabId });

      // Send summary to content script
      await sendMessageToTab(tabId, {
        action: "showSummary",
        summary: data.summary,
      });
    }
  } catch (error) {
    console.log("Summarization error:", error);
    if (isExtensionContextValid()) {
      // Clear loading badge on error
      await chrome.action.setBadgeText({ text: "", tabId });
      // Send error to content script
      await sendMessageToTab(tabId, {
        action: "showError",
        error: error.message || "Failed to summarize text",
      });
    }
  }
}
