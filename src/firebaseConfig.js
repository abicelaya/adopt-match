import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZr25Z2L9RC3nFQrVnSLB3XJ6um6avy6Y",
  authDomain: "adoptmatch-bf621.firebaseapp.com",
  projectId: "adoptmatch-bf621",
  storageBucket: "adoptmatch-bf621.appspot.com",
  messagingSenderId: "607186453610",
  appId: "1:607186453610:web:807c3658694ba0b532f613",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
