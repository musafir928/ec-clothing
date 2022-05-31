import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAuMA2lx-H7ny4raJRGxgf5eVyp2dXP5_Q',
    authDomain: 'ec-clothing-adil.firebaseapp.com',
    projectId: 'ec-clothing-adil',
    storageBucket: 'ec-clothing-adil.appspot.com',
    messagingSenderId: '388712877589',
    appId: '1:388712877589:web:ed7bc933d2d7936b21c81c'
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    // checking the user exists or not
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.error('user creating failed', error.message);
        }
    }

    return userDocRef;
};
