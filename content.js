// コードセルのテキストを取得
function extractCodeCells() {
  let cells = document.querySelectorAll('div.cell.code div.input pre');
  let allCode = '';
  cells.forEach((cell) => {
    allCode += cell.innerText + "\n\n";
  });
  return allCode;
}

// コードをクリップボードにコピー
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("コードをコピーしました！");
  }).catch(err => {
    console.error("コピーに失敗しました: ", err);
  });
}

// Colabツールバーにボタンを追加
function addExportButton() {
  let toolbar = document.querySelector('colab-toolbar');
  if (!toolbar) return;

  let button = document.createElement('button');
  button.innerText = "コードを抽出";
  button.style = "margin-left:10px; padding:8px; background:#4285F4; color:#FFF; border:none; border-radius:5px;";
  button.onclick = () => {
    let code = extractCodeCells();
    copyToClipboard(code);
  };
  toolbar.appendChild(button);
}

// ページロード時にボタンを追加
window.onload = addExportButton;
