firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if (user != null) {
        console.log(user.email);
      }
    } else {
      // No user is signed in.
    }
  });

function login(){
    useremail=document.getElementById('email').value;
    userpass=document.getElementById('pass').value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}