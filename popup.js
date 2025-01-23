document.getElementById('exportBtn').addEventListener('click', async () => {
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        let cells = document.querySelectorAll('div.cell.code div.input pre');
        let allCode = '';
        cells.forEach((cell) => {
          allCode += cell.innerText + "\n\n";
        });
        return allCode;
      }
    }, (result) => {
      if (chrome.runtime.lastError) {
        alert("スクリプト実行エラー: " + chrome.runtime.lastError.message);
        console.error("スクリプト実行エラー:", chrome.runtime.lastError);
        return;
      }

      if (result && result[0].result) {
        document.getElementById('codeOutput').value = result[0].result;
      } else {
        alert("コードの抽出に失敗しました（結果なし）");
        console.error("コード抽出エラー: 実行結果が空です", result);
      }
    });
  } catch (error) {
    alert("エラーが発生しました: " + error.message);
    console.error("エラー詳細:", error);
  }
});
