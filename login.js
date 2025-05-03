import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// 1. Firebase 初期化
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

// 2. メール/パスワードでログイン
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // ログイン成功
      console.log("ログイン成功", userCredential.user);
      location.href = "home.html"; // ホームページへ遷移
    })
    .catch(error => {
      console.error("ログイン失敗", error);
      alert("ログインに失敗しました: " + error.message);
    });
});

// 3. SNSログイン（Google, Facebook, Twitter）
const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
  twitter: new TwitterAuthProvider()
};
["google", "facebook", "twitter"].forEach(provider => {
  document.getElementById(`${provider}-login`).addEventListener("click", () => {
    signInWithPopup(auth, providers[provider])
      .then(result => {
        console.log(`${provider}ログイン成功`, result.user);
        location.href = "home.html";
      })
      .catch(error => {
        console.error(`${provider}ログイン失敗`, error);
        alert(`${provider}ログインに失敗しました: ` + error.message);
      });
  });
});
