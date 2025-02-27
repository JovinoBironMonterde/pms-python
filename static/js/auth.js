// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase Config (Ensure this matches your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyDODrtOmU7NJCfeGh0J7wjSOqOeoIc5XRg",
  authDomain: "pms-python.firebaseapp.com",
  projectId: "pms-python",
  storageBucket: "pms-python.appspot.com",
  messagingSenderId: "234354770689",
  appId: "1:234354770689:web:6755d1f451bda1718b5100",
  measurementId: "G-JV3Q83GSC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle User Registration
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Registration successful!");
      window.location.href = "/login"; // Redirect to login page
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
