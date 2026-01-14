async function openSidePanel(mode) {
  // store mode
  await chrome.storage.local.set({ panelMode: mode });

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  // enable side panel
  await chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: "sidebar/index.html",
    enabled: true
  });

  // ✅ MUST be called here (user gesture context)
  await chrome.sidePanel.open({
    tabId: tab.id
  });
}

document.getElementById("followUp").addEventListener("click", () => {
  openSidePanel("FOLLOW_UP");
});

document.getElementById("replyMail").addEventListener("click", () => {
  openSidePanel("REPLY_MAIL");
});

