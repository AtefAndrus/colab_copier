document.getElementById('exportBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractCodeCells,
  }, (result) => {
    document.getElementById('codeOutput').value = result[0].result;
  });
});
