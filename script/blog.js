
const postList=document.querySelector('.postList');

firebase.auth().onAuthStateChanged(function(user) {
    let btn= document.getElementById('loginBtn');
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if (user != null) {        
        btn.innerHTML="Log Out";
        btn.id="logoutBtn";
        btn.addEventListener('click',logout);
      }
    } else {
      // No user is signed in.
      btn.innerHTML="Log in";
      btn.id="loginBtn";
    }
  });


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
    p.append('comment:'+doc.data().comments);
    author.append(doc.data().author);


  
    content.appendChild(title);
    post.appendChild(img);
    post.appendChild(footer);
    footer.appendChild(h4);
    footer.appendChild(p);
    footer.appendChild(author);
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
  let wrapper=document.createElement('div');
  let heading=document.createElement('div');
  let title=document.createElement('h1');
  let author=document.createElement('p');
  let comment=document.createElement('p');
  let likes=document.createElement('p');
  let body=document.createElement('div');
  let post_content=document.createElement('p');
  let comment_section=document.createElement('div');
  let comment_form=document.createElement('form');
  let txtLabel=document.createElement('label');
  let textarea= document.createElement('textarea');
  let nameLabel=document.createElement('label');
  let txtName= document.createElement('input');
  let emailLabel=document.createElement('label');
  let txtEmail=document.createElement('input');
  let btn=document.createElement('button');
 

  txtLabel.append('Comment:');
  nameLabel.append('Names');
  emailLabel.append('Email');
  title.append(doc.data().title);
  author.append('written by: '+doc.data().author);
  likes.append('likes: '+doc.data().likes);
  comment.append('comments: '+doc.data().comments);
  
  heading.appendChild(title);
  heading.appendChild(author);
  heading.appendChild(comment);
  heading.appendChild(likes);

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
  comment_form.setAttribute('class', 'comment_form');
  btn.setAttribute('class','comment_btn');


  wrapper.appendChild(heading);
  wrapper.appendChild(body);
  wrapper.appendChild(comment_section);






  postDiv.appendChild(wrapper);



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