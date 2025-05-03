import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("ログイン成功", userCredential.user);
      location.href = "home.html";
    })
    .catch(error => {
      console.error("ログイン失敗", error);
      alert("ログインに失敗しました: " + error.message);
    });
});

// Googleログインのみ
const googleProvider = new GoogleAuthProvider();
const googleButton = document.getElementById("google-login");
googleButton.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      console.log("Googleログイン成功", result.user);
      location.href = "home.html";
    })
    .catch(error => {
      console.error("Googleログイン失敗", error);
      alert("Googleログインに失敗しました: " + error.message);
    });
});
