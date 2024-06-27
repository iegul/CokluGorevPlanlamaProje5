import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5rxC1CtlZ9X1Q7Mmpi8zIzCrjZBwnKOw",
  authDomain: "wtp-deneme.firebaseapp.com",
  projectId: "wtp-deneme",
  storageBucket: "wtp-deneme.appspot.com",
  messagingSenderId: "148792069985",
  appId: "1:148792069985:web:7cf228a6c246f103237f20",
  measurementId: "G-RWZ9V8L471",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

const signUp = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
};

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = () => {
  return signOut(auth);
};

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export { auth, signUp, signIn, signOutUser, getCurrentUser };
export default app;
