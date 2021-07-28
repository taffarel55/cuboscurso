const modal = document.querySelector('.modal');
const info  = document.querySelector('.info');

info.addEventListener('click',()=>{
    if(modal.style.visibility==='hidden') {
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
    } else {
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }
});