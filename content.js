// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addToTabGroup') {
    // Get the current tab's ID
    const currentTabId = sender.tab.id;

    // Get the group index passed in the message
    const groupIndex = message.groupIndex;

    // Send a message to the background script to add the tab to the specified group
    chrome.runtime.sendMessage({
      action: 'addTabToGroup',
      tabId: currentTabId,
      groupIndex: groupIndex,
    });
  }
});
