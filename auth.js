import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Firebase 初期化
const firebaseConfig = { /* 省略 */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// メールリンク設定
const actionCodeSettings = {
  url: window.location.origin + '/home.html',
  handleCodeInApp: true
};

// メールリンクログイン
const loginBtn = document.getElementById('login-button');
if (loginBtn) loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('emailForSignIn', email);
      alert('確認用リンクをメールに送りました');
    })
    .catch(e => alert(e.message));
});

// リンクからのサインイン
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = localStorage.getItem('emailForSignIn') || prompt('メールアドレスを入力してください');
  signInWithEmailLink(auth, email, window.location.href)
    .then(res => updateNav(res.user.email))
    .catch(console.error);
}

// Google ログイン
const googleBtn = document.getElementById('google-login');
if (googleBtn) googleBtn.addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(res => updateNav(res.user.email))
    .catch(e => alert(e.message));
});

// サインアップ
const signupBtn = document.getElementById('signup-button');
if (signupBtn) signupBtn.addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-password').value;
  const conf = document.getElementById('signup-confirm').value;
  if (pass !== conf) return alert('パスワードが一致しません');
  createUserWithEmailAndPassword(auth, email, pass)
    .then(res => updateNav(res.user.email))
    .catch(e => alert(e.message));
});

// ログアウト
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => location.href = 'login.html');
});

// ナビバー更新
function updateNav(email) {
  const btn = document.getElementById('account-btn');
  btn.textContent = email;
  document.getElementById('dropdown-content').style.display = 'block';
}

// ドロップダウン制御
const accBtn = document.getElementById('account-btn');
if (accBtn) accBtn.addEventListener('click', () => {
  const d = document.getElementById('dropdown-content');
  d.style.display = d.style.display === 'block' ? 'none' : 'block';
});
