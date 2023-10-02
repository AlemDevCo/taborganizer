// When the extension popup is opened, load the existing tab groups
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'getTabGroups' }, (tabGroups) => {
    const tabGroupsDiv = document.getElementById('tabGroups');
    tabGroupsDiv.innerHTML = '';

    // Display existing tab groups
    tabGroups.forEach((group, index) => {
      const groupDiv = document.createElement('div');
      groupDiv.innerHTML = `<button class="group-button">${group.name}</button>`;
      groupDiv.querySelector('.group-button').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'switchTabGroup', index });
      });
      tabGroupsDiv.appendChild(groupDiv);
    });
  });

  // Create a new tab group
  const createGroupButton = document.getElementById('createGroup');
  createGroupButton.addEventListener('click', () => {
    const groupName = prompt('Enter a name for the new tab group:');
    if (groupName) {
      chrome.runtime.sendMessage({ action: 'createTabGroup', name: groupName });
    }
  });
});
