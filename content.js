// Googleフォームの作業報告自動入力スクリプト

// フォームURLが正しいか確認
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSchhGFYZ1w4QX_kOFG_bRdTeYK2K7nSCRrNZrgthSpjLRcbGQ/viewform';

// ユーザー設定
let userData = {
  name: '', // ユーザー名を保存
};

// ストレージからユーザーデータを読み込む
chrome.storage.sync.get(['userData'], (result) => {
  if (result.userData) {
    userData = result.userData;
  }
});

// ページがロードされたときの処理
window.addEventListener('load', () => {
  // 現在のURLがターゲットフォームかチェック
  if (window.location.href.startsWith(FORM_URL)) {
    console.log('作業報告フォームを検出しました。自動入力を開始します...');

    // 少し待機してからフォームに入力（フォームが完全にロードされるのを待つ）
    setTimeout(autoFillForm, 1000);
  }
});

// フォームに自動入力する関数
function autoFillForm() {
  try {
    // 1. メールアドレスのチェックボックスにチェックを入れる
    const emailCheckbox = document.querySelector('div[jsname="MPu53c"][aria-label*="返信に表示するメールアドレスとして masaru.takeyoshi@aitravel.jp を記録する"]');
    if (emailCheckbox && emailCheckbox.getAttribute('aria-checked') === 'false') {
      emailCheckbox.click();
      console.log('メールアドレスのチェックボックスにチェックを入れました');
    }

    // 2. 名前入力欄に名前を入力
    const nameInput = document.querySelector('input.whsOnd.zHQkBf[jsname="YPqjbf"][aria-labelledby*="i8"]');
    if (nameInput && userData.name) {
      nameInput.value = userData.name;
      // 入力イベントを発火させてGoogleフォームに変更を認識させる
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('名前を入力しました: ' + userData.name);
    }

    // 3. 作業日を今日の日付に設定
    const dateInput = document.querySelector('input[type="date"].whsOnd.zHQkBf');
    if (dateInput) {
      const today = new Date();
      const year = today.getFullYear();
      // 月は0から始まるため+1する、1桁の場合は0埋め
      const month = String(today.getMonth() + 1).padStart(2, '0');
      // 日も1桁の場合は0埋め
      const day = String(today.getDate()).padStart(2, '0');

      const todayFormatted = `${year}-${month}-${day}`;
      dateInput.value = todayFormatted;
      dateInput.dispatchEvent(new Event('input', { bubbles: true }));
      dateInput.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('作業日を設定しました: ' + todayFormatted);
    }

  } catch (error) {
    console.error('自動入力中にエラーが発生しました:', error);
  }
} 
