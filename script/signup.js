document.getElementById('signup-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    //get user info from the form
    const username=getValues('username');
    const email= getValues('email');
    const pass=getValues('pass');
    const confirm=getValues('pass-2');

    if(pass == confirm){
   // signup the user
   firebase.auth().createUserWithEmailAndPassword(email, pass)
   .then(cred=>{
      return db.collection('users').doc(cred.user.uid).set({
          username:username,
          email: email,
          password:pass
      })
   }).then(()=>{

   }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    // ...
  });
   document.getElementById('signup-form').reset();
    }
    else{
        window.alert("password does not match");
    }
    
}
 );




function getValues(id){
    return document.getElementById(id).value;
}