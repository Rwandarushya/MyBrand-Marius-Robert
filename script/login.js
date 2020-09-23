

function login(){
    useremail=document.getElementById('email').value;
    userpass=document.getElementById('pass').value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

      document.querySelector('.alert').style.display='block';
      document.querySelector('.alert').innerHTML=errorMessage;
      setTimeout(function(){
          document.querySelector('.alert').style.display='none'; 
      },3000);
      document.getElementById('contactForm').reset();
      });
  firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            if (user != null) {
              console.log(user.email);
              window.location.href='../html/blog.html';
            }
          } else {
            // No user is signed in.
          }
        });
}

