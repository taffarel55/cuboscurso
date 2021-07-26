const frutas = document.querySelectorAll('li');
const input  = document.querySelector('input');

function buscarFruta(event) {
    if(event.code==='Enter') {
        frutas.forEach(x=> {
            x.classList.add('escondido');
            if(x.textContent.toLowerCase().includes(input.value.toLowerCase())) {
                x.classList.remove('escondido');
            }
        });
    }
}