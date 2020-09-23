
function adminLogin(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if (user != null) {
        var userId=user.uid;
  
        var userCollection = db.collection("users").doc(userId);
        userCollection.get().then(function(doc) {
            if (doc.data().role=='admin') {
                window.location.href='../html/admin.html';
            } else {
                // doc.data() will be undefined in this case
                window.location.href='../html/notification.html';
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      }
    } else {
      // No user is signed in.
      window.alert("Sorry you are not logged in!");
    }
  });
}

