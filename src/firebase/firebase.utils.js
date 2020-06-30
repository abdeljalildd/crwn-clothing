import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAwcOy5nTeAe6aWibjhNcj_8Q3gFHEaTU4",
    authDomain: "crwn-db-aec54.firebaseapp.com",
    databaseURL: "https://crwn-db-aec54.firebaseio.com",
    projectId: "crwn-db-aec54",
    storageBucket: "crwn-db-aec54.appspot.com",
    messagingSenderId: "138681849940",
    appId: "1:138681849940:web:47062c1a35ace315ebb5c1",
    measurementId: "G-2MBMB7FRLV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	
	if(!snapShot.exists){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try{
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error){
			console.log('error creating user', error.message);
		}
	}

return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;