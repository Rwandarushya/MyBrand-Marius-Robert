
var db = firebase.firestore();

document.getElementById('contactForm').addEventListener('submit',submitForm);

function submitForm(e){
e.preventDefault();

var name=getFormValues('name');
var email=getFormValues('email');
var message=getFormValues('message');
saveMessage(name,email,message);
document.querySelector('.alert').style.display='block';
setTimeout(function(){
    document.querySelector('.alert').style.display='none'; 
},3000);
document.getElementById('contactForm').reset();
}

function getFormValues(id){
return document.getElementById(id).value;
}


// save message to firebase

function saveMessage(name, email, message){
  db.collection("contacts").add({
    name: name,
    email: email,
    message: message
})
.then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}