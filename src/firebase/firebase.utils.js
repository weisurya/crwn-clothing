import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAtfRmJ0i4UUwgCd1YBW1mlZabPYlA07QI",
    authDomain: "crwn-clothing-db-ef229.firebaseapp.com",
    projectId: "crwn-clothing-db-ef229",
    storageBucket: "crwn-clothing-db-ef229.appspot.com",
    messagingSenderId: "868083879176",
    appId: "1:868083879176:web:bdef0b1ebc4e10313530bd",
    measurementId: "G-PXSCZQH1S7"
};

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider)
    .catch((error) => console.log(error));
