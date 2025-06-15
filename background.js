// バックグラウンドスクリプト

// 拡張機能がインストールまたは更新されたときの処理
chrome.runtime.onInstalled.addListener(() => {
  console.log('Google作業報告自動入力拡張機能がインストールされました');

  // デフォルト設定を保存
  chrome.storage.sync.get(['userData'], (result) => {
    if (!result.userData) {
      const defaultUserData = {
        name: '', // 初期状態では空
      };
      chrome.storage.sync.set({ userData: defaultUserData });
    }
  });
});

// アイコンがクリックされたときのポップアップはpopup.htmlで処理
