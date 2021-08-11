let paises = [];
const paisesDiv = document.querySelector('.paises');
const busca = document.querySelector('.busca');

// eslint-disable-next-line no-unused-vars
let i = 0;
window.addEventListener('DOMContentLoaded', async ()=>{
  paises = await getData('');
  paises.forEach((pais)=>{
    if (i++>50) return;

    const div = document.createElement('div');
    // eslint-disable-next-line max-len
    div.classList.add('w3-card', 'w3-light-grey', 'w3-container', 'w3-center', 'w3-padding-16', 'w3-round-xlarge', 'w3-mobile');

    const h2 = document.createElement('h2');
    h2.textContent = pais.name;

    const span1 = document.createElement('span');
    span1.textContent = pais.region;

    const span2 = document.createElement('span');
    span2.textContent = pais.capital;

    const p = document.createElement('p');
    p.textContent = pais.population;

    const img = document.createElement('img');
    img.src = pais.flag;
    img.classList.add('w3-round');

    div.append(h2, span1, span2, p, img);
    paisesDiv.append(div);
  });
});


// eslint-disable-next-line require-jsdoc
async function getData(path) {
  const response = await fetch('https://restcountries.eu/rest/v2/all'+path);
  const data = await response.json();
  return data;
}

busca.addEventListener('keydown', (event)=>{
  // eslint-disable-next-line keyword-spacing
  if(!(event.key==='Enter' && busca.value.length)) return;
  Array.from(paisesDiv.children).forEach((pais)=>{
    const elemento = pais.children[0].textContent.toLocaleLowerCase();
    const pesquisa = event.target.value.toLocaleLowerCase();
    if (elemento.includes(pesquisa)) {
      pais.classList.remove('w3-hide');
    } else {
      pais.classList.add('w3-hide');
    }
  });
});
