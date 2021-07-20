const input = 'cubos\ncuuuggbyos';

const inputTratada = input.split('\n');
const senha = inputTratada[0].split('');
const entrada = inputTratada[1].split('').filter(x=>senha.indexOf(x)!==-1);

// console.log('Apos tratamento:')
// console.log(senha);
// console.log(entrada);
// console.log('\n')

const d = senha.length;
let   a = 0;

while(senha.length) {
    //console.log(`Letras restantes para verificar são: [${senha}]`);
    const letra = senha.shift();
    //console.log(`Vou verificar se tem ${letra} em [${entrada}]`);
    let temLetra = false;
    for(const i of entrada) {
        letraInserida = entrada.shift();
        //console.log(`Vou verificar se ${letraInserida}=${letra}`)
        if(letraInserida===letra) {
            //console.log(`Opa Achei`);
            temLetra = true;
            a++;
            break;
        }
    }
    //console.log()
}

console.log(a==d?'SIM':'NAO');