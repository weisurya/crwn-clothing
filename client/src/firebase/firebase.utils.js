import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';

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

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
    .catch((error) => console.log(error));

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const userSnap = await getDoc(userRef)

    if(!userSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef,{
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...additionalData,
            })
        } catch(err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        }
    })

    return transformedCollection.reduce(
        (accum, collection) => {
            accum[collection.title.toLowerCase()] = collection;
            return accum;
        },
        {},
    )

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(firestore);

    objectsToAdd.forEach((element) => {
        const docRef = doc(collection(firestore, collectionKey));
        batch.set(docRef, element)
    })

    return await batch.commit();
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}
