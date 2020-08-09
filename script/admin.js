document.getElementById('post-tab').addEventListener('click',showPostTab);
document.getElementById('user-tab').addEventListener('click',showUserTab);
document.getElementById('message-tab').addEventListener('click',showMessageTab);
const postList=document.querySelector('.table-post');
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
    let tr= document.createElement('tr');
    let no=document.createElement('td');
    let title=document.createElement('td');
    let author=document.createElement('td');
    let edit=document.createElement('td');
    let del= document.createElement('td');
    let editBtn=document.createElement('button');
    let deleteBtn=document.createElement('button');
    let edit_icon=document.createElement('i');
    let del_icon=document.createElement('i');

    edit_icon.classList.add("far", "fa-edit");
    del_icon.classList.add("fas", "fa-trash-alt");

    editBtn.appendChild(edit_icon);
    deleteBtn.setAttribute('name', doc.id);
    deleteBtn.addEventListener('click', ()=>deletePost(deleteBtn.name));
    deleteBtn.appendChild(del_icon);
    editBtn.addEventListener('click', deletePost);
    edit.appendChild(editBtn);
    del.appendChild(deleteBtn);
    title.append(doc.data().title);
    author.append(doc.data().author);
    edit.append()

    tr.appendChild(no);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(edit);
    tr.appendChild(del);
    postList.appendChild(tr);
}

function userRef(doc){
    let tr=document.createElement('tr');
    let no=document.createElement('td');
    let username=document.createElement('td');
    let email=document.createElement('td');
    let password=document.createElement('td');
    let rem=document.createElement('td');
    let removeBtn=document.createElement('button');
    let icon=document.createElement('i');
    icon.classList.add("fas", "fa-user-times");

    removeBtn.appendChild(icon);
    removeBtn.setAttribute('name',doc.id);
    removeBtn.addEventListener('click', ()=>deleteUser(removeBtn.name));
    rem.appendChild(removeBtn);

    username.append(doc.data().username);
    email.append(doc.data().email);
    password.append(doc.data().password);

    tr.appendChild(no);
    tr.appendChild(username);
    tr.appendChild(email);
    tr.appendChild(password);
    tr.appendChild(rem);
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



function showPostTab(e){
    e.preventDefault();
    document.getElementById('post-tab').setAttribute('class',"active-li");
    document.getElementById('user-tab').classList.remove("active-li");
    document.getElementById('message-tab').classList.remove("active-li");
    document.querySelector('.table-tab').style.display='block';
    document.querySelector('.posts').style.display='block';
    document.querySelector('.users').style.display='none';
    document.querySelector('.messages').style.display='none';
    document.querySelector('.create-post').style.display='none';
}

function showUserTab(e){
    e.preventDefault();
    document.getElementById('user-tab').setAttribute('class',"active-li");
    document.getElementById('post-tab').classList.remove("active-li");
    document.getElementById('message-tab').classList.remove("active-li");
    document.querySelector('.table-tab').style.display='block';
    document.querySelector('.users').style.display='block';
    document.querySelector('.posts').style.display='none';
    document.querySelector('.messages').style.display='none';
    document.querySelector('.create-post').style.display='none';
}
function showMessageTab(e){
    e.preventDefault();
    document.getElementById('message-tab').setAttribute('class',"active-li");
    document.getElementById('post-tab').classList.remove("active-li");
    document.getElementById('user-tab').classList.remove("active-li");
    document.querySelector('.table-tab').style.display='block';
    document.querySelector('.messages').style.display='block';
    document.querySelector('.users').style.display='none';
    document.querySelector('.posts').style.display='none';
    document.querySelector('.create-post').style.display='none';

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



function addPost(){
    document.querySelector('.create-post').style.display='block';
    document.querySelector('.table-tab').style.display='none';
}

document.getElementById('form-post').addEventListener('submit',savePost);
function savePost(e){
    e.preventDefault();
    let category=document.getElementById('cate').value;
    let title=document.getElementById('tit').value;
    let content=document.getElementById('content').value;
    db.collection("posts").add({
        author:"Admin",
        category: category,
        title: title,
        body: content,
        likes:0,
        comments:0
    })
    .then(function(docRef) {
         window.alert("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        window.alert("Error adding document: ", error);
    });
    document.getElementById('form-post').reset();
    
}

