console.log(document.querySelector('h1').textContent);
const frutas = document.querySelectorAll('li');
const input = document.querySelector('input');

function buscarFruta(event) {
    
    if (event.code === 'Enter') {
        frutas.forEach(fruta => {
            fruta.classList.remove('escondido');
            if (input.value && fruta.textContent!==input.value) {
                fruta.classList.add('escondido');
            }
        });
        input.value = '';
    }
}