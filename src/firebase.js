import firebase from "firebase";

 const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDgmoL2Q3Cwgunda0t57ytKJ-ZUA3JlX7w",
    authDomain: "todo-app-cp-58bb5.firebaseapp.com",
    databaseURL: "https://todo-app-cp-58bb5.firebaseio.com",
    projectId: "todo-app-cp-58bb5",
    storageBucket: "todo-app-cp-58bb5.appspot.com",
    messagingSenderId: "757939882097",
    appId: "1:757939882097:web:a81c9984df00d0956a33d0",
    measurementId: "G-33ZYLBN9G6"
  });

  const db = firebaseApp.firestore();

  export default db ;