// ポップアップのJavaScript

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  // 要素の取得
  const nameInput = document.getElementById('name');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  // 保存されている設定を読み込む
  chrome.storage.sync.get(['userData'], (result) => {
    if (result.userData) {
      nameInput.value = result.userData.name || '';
    }
  });

  // 保存ボタンのクリックイベント
  saveButton.addEventListener('click', () => {
    const userData = {
      name: nameInput.value.trim(),
    };

    // 設定を保存
    chrome.storage.sync.set({ userData }, () => {
      // 保存完了メッセージを表示
      statusDiv.textContent = '設定を保存しました！';

      // 一定時間後にメッセージを消す
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 2000);
    });
  });
});
