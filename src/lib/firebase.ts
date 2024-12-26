// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCPjnn5DyKvhiJYpCIvxMmYXJ4tiW0Lpt8',
	authDomain: 'document-search-e8334.firebaseapp.com',
	projectId: 'document-search-e8334',
	storageBucket: 'document-search-e8334.firebasestorage.app',
	messagingSenderId: '996001579081',
	appId: '1:996001579081:web:81c51740e0217a02b4ff98',
	measurementId: 'G-3PC2H334BV'
};
//
// // Initialize Firebase


let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const auth = getAuth(firebaseApp)

