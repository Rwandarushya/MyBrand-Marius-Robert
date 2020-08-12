
const postList=document.querySelector('.postList');
checkUserState();
function checkUserState(){
firebase.auth().onAuthStateChanged(function(user) {
    let btn= document.getElementById('loginBtn');
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if (user != null) {        
        btn.innerHTML="Log Out";
        btn.addEventListener('click',logout);
      }
    } else {
      // No user is signed in.
      btn.innerHTML="Log in";
    }
  });
}

// refer to every document 
function docRef(doc){
    let div=document.createElement('div');
    let content= document.createElement('div');
    let title=document.createElement('div');
    let h1= document.createElement('h1');
    let post=document.createElement('div');
    let img=document.createElement('img');
    let footer=document.createElement('div');
    let h4=document.createElement('h4');
    let p=document.createElement('p');
    let author=document.createElement('a');
    post.classList.add('post')
    img.src="../assets/images/macbook-pro.png";
    h4.append(doc.data().title);
    p.append('comment:'+doc.data().comments.length);
    author.append('Author: '+doc.data().author);

  p.setAttribute('class','info');
  author.setAttribute('class', 'info');
  
    content.appendChild(title);
    post.appendChild(img);
    post.appendChild(footer);
    footer.appendChild(h4);
    footer.appendChild(p);
    footer.appendChild(author);
    post.addEventListener('click',()=> openPost(doc))
    postList.appendChild(post);
}



const post=db.collection('posts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        docRef(doc);
        recentPost(doc);
    });
});



recentdiv=document.querySelector('.recent-links');
function recentPost(post){
let tit=document.createElement('a');
tit.addEventListener('click',()=> openPost(post));
tit.append(post.data().title);
recentdiv.appendChild(tit);
}

const postDiv= document.querySelector('.read-post');
function openPost(doc){
  while (postDiv.lastElementChild) {
    postDiv.removeChild(postDiv.lastElementChild);
  }

  document.querySelector('.content').style.display='none';
  document.querySelector('.read-post').style.display='block';
  let wrapper=document.createElement('div');
  let heading=document.createElement('div');
  let title=document.createElement('h1');
  let info=document.createElement('div');
  let author=document.createElement('p');
  let comment=document.createElement('p');
  let likes=document.createElement('p');
  let body=document.createElement('div');
  let post_content=document.createElement('p');
  let line=document.createElement('hr');
  let comment_title=document.createElement('h3');
  let previous_comments=document.createElement('div');
  let comment_section=document.createElement('div');
  let comment_form=document.createElement('form');
  let txtLabel=document.createElement('label');
  let textarea= document.createElement('textarea');
  let nameLabel=document.createElement('label');
  let txtName= document.createElement('input');
  let emailLabel=document.createElement('label');
  let txtEmail=document.createElement('input');
  let btn=document.createElement('button');
  let close=document.createElement('i'); 
  
  comment_title.setAttribute('class',comment_title);
  comment_title.append("comments:");



  txtName.setAttribute('id','name');
  txtEmail.setAttribute('id','email');
  textarea.setAttribute('id', 'comment');

  close.setAttribute('class', "fa fa-close");
  close.addEventListener('click',()=>showAllPost());
  btn.append('Send Comment');

  btn.setAttribute('type','button');
  txtLabel.append('Comment:');
  nameLabel.append('Names');
  emailLabel.append('Email');
  title.append(doc.data().title);
  author.append('written by: '+doc.data().author);
  likes.append('likes: '+doc.data().likes);
  comment.append('comments: '+doc.data().comments.length);
  
  info.setAttribute('class', 'info');
  info.appendChild(author);
  info.appendChild(comment);
  info.appendChild(likes);
  heading.appendChild(title);
  heading.appendChild(info);

  post_content.append(doc.data().body);
  body.appendChild(post_content);



  comment_form.appendChild(txtLabel);
  comment_form.appendChild(textarea);
  comment_form.appendChild(nameLabel);
  comment_form.appendChild(txtName);
  comment_form.appendChild(emailLabel);
  comment_form.appendChild(txtEmail);
  comment_form.appendChild(btn);

  comment_section.appendChild(comment_form);



  // adding classes to the elements
  wrapper.setAttribute('class', 'post_wrapper');
  heading.setAttribute('class', 'post_heading');
  title.setAttribute('class','post_title');
  body.setAttribute('class','post_body');
  previous_comments.setAttribute('class','previous_comments');
  comment_section.setAttribute('class', 'comment_section');
  comment_form.setAttribute('class', 'comment_form');
  btn.setAttribute('class','comment_btn');
  btn.addEventListener('click',()=>saveComment(doc));
 
  wrapper.appendChild(close);
  wrapper.appendChild(heading);
  wrapper.appendChild(body);
  wrapper.appendChild(line);
  wrapper.appendChild(comment_title);

  var ar=doc.data().comments;
  count= doc.data().comments.length;
  for(i=0;i<count;i++){
    let nm=document.createElement('h4');
    nm.setAttribute('class','sender');
    let cm=document.createElement('p');
    let first=document.createElement('div');
    let sec=document.createElement('div');
    nm.append(ar[i].Names+':');
    cm.append(ar[i].comment);
    first.append(nm);
    sec.append(cm)    
    previous_comments.append(first);
    previous_comments.appendChild(sec);
  }  
  wrapper.appendChild(previous_comments);
  wrapper.appendChild(comment_section);
  checkUserState();
  postDiv.appendChild(wrapper);

  

}

function showAllPost(){
  document.querySelector('.content').style.display='block';
  document.querySelector('.read-post').style.display='none';
}


function saveComment(doc){
  firebase.auth().onAuthStateChanged(function(user) {
    let btn= document.getElementById('loginBtn');
    if (user) {
      // User is signed in.
      let name=document.getElementById('name').value;
      let email=document.getElementById('email').value;
      let comment=document.getElementById('comment').value;
      db.collection("posts").doc(doc.id).update( {comments: firebase.firestore.FieldValue.arrayUnion({Names:name,email:email, comment:comment})})
      .then(function(docRef) {
          window.alert('Comment sent');
          location.reload();
      })
      .catch(function(error) {
         var message_error=error.message_error;
         window.alert(message_error);
      });
    } else {
      // No user is signed in.
      window.alert('Sorry you can not comment on post! please Login')
    }
  });
    
}


function logout(e){
    e.preventDefault();
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.reload();
      }).catch(function(error) {
        // An error happened.
      });
}
