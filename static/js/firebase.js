// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase Configuration (Replace with your actual keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore Database

// User Login Function
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
  // Fetch user data from Firestore
  const userDocRef = doc(db, "users", userCredential.user.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (userSnapshot.exists()) {
    console.log("User data:", userSnapshot.data());
    return userSnapshot.data(); // Return user data
  } else {
    throw new Error("User not found in database");
  }
}

// User Register Function (Also Stores User Data in Firestore)
export async function registerUser(email, password, fullName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user details to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: email,
    fullName: fullName,
    createdAt: new Date()
  });

  return user;
}

// Logout Function
export function logoutUser() {
  return signOut(auth);
}
