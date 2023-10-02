let tabGroups = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTabGroups') {
    sendResponse(tabGroups);
  } else if (request.action === 'createTabGroup') {
    const newGroup = { name: request.name, tabs: [] };
    tabGroups.push(newGroup);
    sendResponse(newGroup);
  } else if (request.action === 'switchTabGroup') {
    const index = request.index;
    if (index >= 0 && index < tabGroups.length) {
      const tabsToSwitch = tabGroups[index].tabs;
      chrome.tabs.query({}, (allTabs) => {
        allTabs.forEach((tab) => {
          if (tabsToSwitch.includes(tab.id)) {
            chrome.tabs.update(tab.id, { active: true });
          }
        });
      });
    }
  }
});

// Listen for tab changes and update tab group information
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const currentGroup = tabGroups.find((group) => group.tabs.includes(tabId));
  if (currentGroup) {
    if (changeInfo.url) {
      currentGroup.tabs = currentGroup.tabs.filter((t) => t !== tabId);
    }
  }
});

// Listen for tab removal and update tab group information
chrome.tabs.onRemoved.addListener((tabId) => {
  tabGroups.forEach((group) => {
    group.tabs = group.tabs.filter((t) => t !== tabId);
  });
});
