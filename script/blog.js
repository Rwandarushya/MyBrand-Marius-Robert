
const postList=document.querySelector('.postList');


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
    });
});