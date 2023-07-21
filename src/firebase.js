
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM0TP7gjhKpqu3Of9o4dTsI-AHi13Nvls",
  authDomain: "video-90319.firebaseapp.com",
  projectId: "video-90319",
  storageBucket: "video-90319.appspot.com",
  messagingSenderId: "307044028773",
  appId: "1:307044028773:web:d7b9d4127825647c0a118c",
  measurementId: "G-ZH7Y6VC5Z6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;