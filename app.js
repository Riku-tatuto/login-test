import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyC7YbZqGoXHXt_PAczz7WKuTI6QCpJPcQM",
  authDomain: "test-login-db.firebaseapp.com",
  projectId: "test-login-db",
  storageBucket: "test-login-db.firebasestorage.app",
  messagingSenderId: "938432495254",
  appId: "1:938432495254:web:c84375f17a3c7e7ae18cb7"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ログイン処理
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      window.location.href = 'home.html';
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = document.getElementById('error-message');
      errorMsg.textContent = error.message;
      errorMsg.style.display = 'block';
    }
  });
});
