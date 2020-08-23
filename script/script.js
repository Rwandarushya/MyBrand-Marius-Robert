const navSlide=() =>{
    const burger=document.querySelector('.burger');
    const nav=document.querySelector('.nav-links');
    const navLinks= document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', ()=>{
        // toogle nav
        nav.classList.toggle('nav-active');
        // animate links
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation='';
            }
            else
            {
            link.style.animation=`navLinkFade 0.5s ease forwards ${index /7}s`;
            }
        });
        // burger animation
        burger.classList.toggle('toggle');
    });

    
}

navSlide();

function updateTransition() {
    var el = document.querySelector("div.box");
     
    if (el) {
      el.className = "box1";
    } else {
      el = document.querySelector("div.box1");
      el.className = "box";
    }
     
    return el;
  }
  
  var intervalID = window.setInterval(updateTransition, 7000);