import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBY4mZucvU64T7Gk7W2ldCxTHtiyxrGmgg",
    authDomain: "ronapp-dd9fc.firebaseapp.com",
    projectId: "ronapp-dd9fc",
    storageBucket: "ronapp-dd9fc.appspot.com",
    messagingSenderId: "1039905565098",
    appId: "1:1039905565098:web:adee2655ab3aafefdc23d3",
    measurementId: "G-481580D9J0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

export default firebase;