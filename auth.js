import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Firebase 初期化
const firebaseConfig = {
  apiKey: "AIzaSyC7YbZqGoXHXt_PAczz7WKuTI6QCpJPcQM",
  authDomain: "test-login-db.firebaseapp.com",
  projectId: "test-login-db",
  storageBucket: "test-login-db.firebasestorage.app",
  messagingSenderId: "938432495254",
  appId: "1:938432495254:web:c84375f17a3c7e7ae18cb7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// メール/パスワードでログイン
const loginBtn = document.getElementById('login-button');
if (loginBtn) loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(res => updateNav(res.user.email))
    .catch(e => alert(e.message));
});

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
  const dd = document.querySelector('.dropdown-content');
  dd.style.display = 'block';
}

// ドロップダウン制御
const accBtn = document.getElementById('account-btn');
if (accBtn) accBtn.addEventListener('click', () => {
  const d = document.querySelector('.dropdown-content');
  d.style.display = d.style.display === 'block' ? 'none' : 'block';
});
