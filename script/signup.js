document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info from the form
    const username = getValues('username');
    const email = getValues('email');
    const pass = getValues('pass');
    const confirm = getValues('pass-2');

    if (pass == confirm) {
        // signup the user
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    username: username,
                    email: email,
                    password: pass,
                    role: "guest"
                })
            }).then(() => {window.location.href = "../html/blog.html"; sendEmail()}).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                document.querySelector('.alert').style.display = 'block';
                document.querySelector('.alert').innerHTML = errorMessage;
                setTimeout(function () {
                    document.querySelector('.alert').style.display = 'none';
                }, 3000);
                document.getElementById('contactForm').reset();
                // ...
            });
        document.getElementById('signup-form').reset();
    } else {
        document.querySelector('.alert').style.display = 'block';
        document.querySelector('.alert').innerHTML = "password does not match";
        setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
        }, 3000);
        document.getElementById('contactForm').reset();
    }

});




function getValues(id) {
    return document.getElementById(id).value;
}

function sendEmail() { 
    Email.send({ 
      Host: "smtp.gmail.com", 
      Username: "rdarushya@gmail.com", 
      To: 'rwandarushyarobert@gmail.com', 
      From: "rdarushya@gmail.com", 
      Subject: "Sending Email using javascript", 
      Body: "Well that was easy!!", 
    }) 
      .then(function (message) { 
        alert("mail sent successfully") 
      }); 
  } 