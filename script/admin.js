document.getElementById('post-tab').addEventListener('click',showUserTab);
document.getElementById('message-tab').addEventListener('click',showMessageTab);
function showUserTab(e){
    e.preventDefault();
    document.querySelector('.users').style.display='block';
    document.querySelector('.posts').style.display='none';
    document.querySelector('.messages').style.display='none';
}
function showMessageTab(e){
    e.preventDefault();
    document.querySelector('.messages').style.display='block';
    document.querySelector('.users').style.display='none';
    document.querySelector('.posts').style.display='none';

}