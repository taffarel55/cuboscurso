const images = document.querySelectorAll('.img-group img');
const modal = document.querySelector('.modal');
const imagem = document.querySelector('.modal .imagem');

images.forEach((img)=>{
    img.addEventListener('click', ()=>{
        imagem.src=img.src;
        modal.style.visibility="visible";
        modal.style.opacity="1";
    });
});

modal.addEventListener('click',()=>{
    modal.style.visibility="hidden";
    modal.style.opacity="0";
});

imagem.addEventListener('click',(event)=>{
    event.stopPropagation();
});