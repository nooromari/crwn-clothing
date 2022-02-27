// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU20I7ebwGIJC_IjzFBxhQCtVTK6xhYIE",
  authDomain: "crwn-db-b42b5.firebaseapp.com",
  projectId: "crwn-db-b42b5",
  storageBucket: "crwn-db-b42b5.appspot.com",
  messagingSenderId: "854206049581",
  appId: "1:854206049581:web:e41c158640502fca87b7a4",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await doc(db, "users", userAuth.uid);
  const snapShot = await getDoc(userRef);

  // Add a new document in collection "users"
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result, 'google sign in')
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // ...
    })
    .catch((error) => {
      console.log(error,'error sign in with google')
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {

  // const collectionRef = collection(db, collectionKey);
  // console.log(collectionRef.path)
  // console.log(await doc(db, collectionKey, ''), 'ref');
  // console.log(objectsToAdd, 'ddd')
  const batch = writeBatch(db);

  await objectsToAdd.forEach(async (obj) => {
    console.log(obj.title.toLowerCase())
    let id = obj.title.toLowerCase();
    const newDocRef = await doc(db, collectionKey, id);
    console.log({newDocRef}, 'ref');
    await batch.set(newDocRef, obj)
  })

  return await batch.commit();
}


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()
    return {
      routeName : encodeURI(title.toLowerCase()),
      id : doc.id,
      title,
      items,
    }
  }) 
  
  return transformedCollection.reduce((a, collection) => {
    a[collection.title.toLowerCase()] = collection;
    return a;
  } ,{});
};
