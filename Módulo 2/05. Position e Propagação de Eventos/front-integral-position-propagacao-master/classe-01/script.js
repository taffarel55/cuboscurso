const inputSenha = document.querySelector('.input-senha');
const olho = document.querySelector('.olho');

olho.addEventListener('click',()=>{
    if (olho.src.includes('assets/olho-fechado.svg')) {
        olho.src = 'assets/olho-aberto.svg';
        olho.classList.add('aberto');
        inputSenha.setAttribute('type','text');
    } else {
        olho.src = 'assets/olho-fechado.svg';
        olho.classList.remove('aberto');
        inputSenha.setAttribute('type','password');
    }
});