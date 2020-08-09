document.getElementById('comment-form').addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
var name=getFormValues('name');
var email=getFormValues('email');
var message=getFormValues('comment-txt');
saveMessage(name,email,message);
document.getElementById('comment-form').reset();
}

function getFormValues(id){
return document.getElementById(id).value;
}


// save message to firebase

function saveMessage(name, email, comment){
    db.collection("comments").add({
        name: name,
        email: email,
        comment: comment
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}