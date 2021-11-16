import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBRzgG3XO4WIy8iliiGVBv0ajyan4hQFNg",
    authDomain: "crwn-db-6d68b.firebaseapp.com",
    projectId: "crwn-db-6d68b",
    storageBucket: "crwn-db-6d68b.appspot.com",
    messagingSenderId: "283917604068",
    appId: "1:283917604068:web:bdc0ff9dd62c8b0ac488f1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user' + error.message);
        }
    }
    return userRef

}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase