

const postList=document.querySelector('.postList');
const usertList=document.querySelector('.user-table');
const messageList=document.querySelector('.table-msg');

const post=db.collection('posts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        postRef(doc);
    });
});

const users=db.collection('users').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        userRef(doc);
    });
});

const Contacts=db.collection('contacts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        messageRef(doc);
    });
});

function postRef(doc){
        let content= document.createElement('div');
        let title=document.createElement('div');
        let action=document.createElement('div');
        let h1= document.createElement('h1');
        let post=document.createElement('div');
        let img=document.createElement('img');
        let footer=document.createElement('div');
        let h4=document.createElement('h4');
        let p=document.createElement('p');
        let author=document.createElement('a');
        let removeBtn=document.createElement('button');
        let editBtn=document.createElement('button');
        let edit_icon=document.createElement('i');
        let icon=document.createElement('i');
         icon.classList.add("fas", "fa-trash-alt");
         edit_icon.classList.add("fas", "fa-edit");

        removeBtn.appendChild(icon);
        editBtn.appendChild(edit_icon);
        editBtn.setAttribute('name',doc.id);
        editBtn.setAttribute('class','editBtn');
        removeBtn.setAttribute('name',doc.id);
        removeBtn.setAttribute('class','removeBtn');
        removeBtn.addEventListener('click', ()=>deletePost(removeBtn.name));
        editBtn.addEventListener('click', ()=>editPost(editBtn.name));
        action.appendChild(removeBtn);
        action.appendChild(editBtn);
        action.classList.add('action_div');
        post.classList.add('post')
        img.src="../assets/images/macbook-pro.png";
        h4.append(doc.data().title);
        p.append('comment:'+doc.data().comments.length);
        author.append('Author: '+doc.data().author);

        author.classList.add("info");
        p.classList.add("info");
        
        content.appendChild(title);
        post.appendChild(img);
        post.appendChild(footer);
        footer.appendChild(action);
        footer.appendChild(h4);
        footer.appendChild(p);
        footer.appendChild(author);
        postList.appendChild(post);
    }


function userRef(doc){
    let tr=document.createElement('tr');
    let no=document.createElement('td');
    let username=document.createElement('td');
    let email=document.createElement('td');
    let role=document.createElement('td');
    let prev=document.createElement('td');
    let btnDiv=document.createElement('div');
    let adminBtn=document.createElement('button');
    let guestBtn=document.createElement('button');
    adminBtn.innerHTML="Admin";
    guestBtn.innerHTML="Guest";
    btnDiv.appendChild(adminBtn);
    btnDiv.appendChild(guestBtn);
    btnDiv.setAttribute('class','privelegesBtnDiv');
 


  
    prev.appendChild(btnDiv);

    username.append(doc.data().username);
    email.append(doc.data().email);
    role.append(doc.data().role);

    tr.appendChild(no);
    tr.appendChild(username);
    tr.appendChild(email);
    tr.appendChild(role);
    tr.appendChild(prev);
    usertList.appendChild(tr);
}

function messageRef(doc){
    let tr=document.createElement('tr');
    let no=document.createElement('td');
    let name=document.createElement('td');
    let email=document.createElement('td');
    let msg=document.createElement('td');
    let rem=document.createElement('td');
    let removeBtn=document.createElement('button');
    let icon=document.createElement('i');
    icon.classList.add("fas", "fa-trash-alt");

    removeBtn.setAttribute('name',doc.id);
    removeBtn.appendChild(icon);
    rem.appendChild(removeBtn);
    removeBtn.setAttribute('class','beleteBtn');
    removeBtn.addEventListener('click',() => deleteMessage(removeBtn.name));

    name.append(doc.data().name);
    email.append(doc.data().email);
    msg.append(doc.data().message);

    tr.appendChild(no);
    tr.appendChild(name);
    tr.appendChild(email);
    tr.appendChild(msg);
    tr.appendChild(rem);
    messageList.appendChild(tr);
}



function showPostSection(e){
    e.preventDefault();
    document.getElementById('post-section').setAttribute('class',"active-li");
    document.getElementById('user-section').classList.remove("active-li");
    document.getElementById('message-section').classList.remove("active-li");
}

function showUserSection(e){
    e.preventDefault();
    document.getElementById('user-section').setAttribute('class',"active-li");
    document.getElementById('post-section').classList.remove("active-li");
    document.getElementById('message-section').classList.remove("active-li");
}
function showMessageSection(e){
    e.preventDefault();
    document.getElementById('message-section').setAttribute('class',"active-li");
    document.getElementById('post-section').classList.remove("active-li");
    document.getElementById('user-section').classList.remove("active-li");
}

function deleteUser(id){
    window.alert('user deleted');
}


function deleteMessage(id){
    db.collection("contacts").doc(id).delete().then(function() {
        window.alert("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        window.alert("Error removing document: ", error);
    });
}
function deletePost(id){
    db.collection("posts").doc(id).delete().then(function() {
        window.alert("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        window.alert("Error removing document: ", error);
    });
}

function editPost(id){
    addPost();
    var edit_form=document.getElementById('form-post');
    let tit=document.getElementById('tit');
    let author=document.getElementById('author');
    let body=document.getElementById('content');
    let btn=document.getElementById('btn-publish');
    btn.setAttribute('class','btn-publish'); 
    var docRef = db.collection("posts").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            tit.value=doc.data().title;
            author.value=doc.data().author;
            body.value=(doc.data().body);
            btn.innerHTML="Update Post";
            btn.removeEventListener('click',savePost);
            btn.addEventListener('click',()=>updatepost(id));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    edit_form.appendChild(btn);
    
}

function updatepost(id){
    let cate=document.getElementById('cate');
    let tit=document.getElementById('tit');
    let author=document.getElementById('author');
    let body=document.getElementById('content');

// Set the new  field of the post'
db.collection("posts").doc(id).update({
    "category":cate.value,
    "title":tit.value,
    "author": author.value,
    "body":body.value,
})
.then(function() {
    window.alert("Post successfully updated!");
    location.reload();
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
location.reload();
}



function addPost(){
    document.querySelector('.create-post').style.display='block';
    document.querySelector('.aside').style.display='none';
}

function hideCreatePost(){
    document.querySelector('.create-post').style.display='none';
    document.querySelector('.aside').style.display='block';
}

document.getElementById('form-post').addEventListener('submit',savePost);
function savePost(e){
    e.preventDefault();
    let category=document.getElementById('cate').value;
    let title=document.getElementById('tit').value;
    let content=document.getElementById('content').value;
    let author=document.getElementById('author').value;
    db.collection("posts").add({
        author:author,
        category: category,
        title: title,
        body: content,
        likes:[],
        comments:[]
    })
    .then(function(docRef) {
         window.alert("Post publishe successfuly!");
         location.reload();
    })
    .catch(function(error) {
        window.alert("Error adding document: ", error);
    });
    document.getElementById('form-post').reset();
    
}

