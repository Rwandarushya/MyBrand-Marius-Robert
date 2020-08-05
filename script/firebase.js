// firebase initialization
var firebaseConfig = {
  apiKey: "AIzaSyBfxQeMSwL4grsWtMAzIaQf1_IdZhL4R2I",
  authDomain: "my-brand-83866.firebaseapp.com",
  databaseURL: "https://my-brand-83866.firebaseio.com",
  projectId: "my-brand-83866",
  storageBucket: "my-brand-83866.appspot.com",
  messagingSenderId: "170892001881",
  appId: "1:170892001881:web:cf6fd03f1d68a88a7ea748",
  measurementId: "G-LBSP5XRY37"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth= firebase.auth();
var db = firebase.firestore();
