const btn = document.querySelector('.btn');
const cancelar = document.querySelector('.cancelar');
const confirmar = document.querySelector('.confirmar');
const modal = document.querySelector('.modal');

btn.addEventListener('click', e => { 
    if (btn.textContent==='Inscrito') {
        modal.classList.remove('escondido');
    } else {
        btn.classList.add('inscrito');
        btn.textContent = 'Inscrito';
    }
});

cancelar.addEventListener('click', e =>{
    modal.classList.add('escondido');
});

confirmar.addEventListener('click', e =>{
    modal.classList.add('escondido');
    btn.classList.remove('inscrito');
    btn.textContent = 'INSCREVER-SE';
});
