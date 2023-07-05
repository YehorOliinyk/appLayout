import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBgWqQsmUtpTkryP2gsPYv3CyCL5aTK-mo",
    authDomain: "app-test-b1b85.firebaseapp.com",
    databaseURL: "https://app-test-b1b85-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app-test-b1b85",
    storageBucket: "app-test-b1b85.appspot.com",
    messagingSenderId: "1077619460259",
    appId: "1:1077619460259:web:a0037d50215faa453a9716"
}
const app = initializeApp(firebaseConfig);

export {app}