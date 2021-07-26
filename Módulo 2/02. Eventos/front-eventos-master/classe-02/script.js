const quiz = [];

for(let i=0; i<5; i++) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.setAttribute('for', `quiz-${i+1}`);
    input.setAttribute('id', `quiz-${i+1}`);
    input.setAttribute('type','text');
    generateExpression();
    label.innerHTML = quiz[i].pergunta;              
    document.body.appendChild(label);
    document.body.appendChild(input);
}

function generateExpression() {
    const operacoes = ['+','-','*','/'];
    const op = operacoes[randomNum(0, operacoes.length)];
    const x = randomNum(1,10);
    const y = randomNum(1,10);
    let resposta;
    switch(op) {
        case '+': resposta=x+y; break;   
        case '-': resposta=x-y; break;
        case '*': resposta=x*y; break;
        case '/': resposta=Math.floor(x/y); break;
    }
    quiz.push({
        pergunta: x.toString()+op+y.toString(),
        resposta: resposta.toString()
    });
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let msg = document.createElement("p");
msg.innerHTML = 'Vamos ver se você é bom em matemática!';
document.body.appendChild(msg);

const input = document.querySelectorAll('input');

input.forEach(x=> x.addEventListener('change', check));

function check(e) {
    let num = e.target.id.replace('quiz-', '')-1;
    if(e.target.value===quiz[num].resposta) {
        e.target.classList.add('acerto');
        e.target.classList.remove('erro');
        msg.style.color = 'green';
        msg.textContent = 'Acertou!'
    } else {
        e.target.classList.remove('acerto');
        e.target.classList.add('erro');
        msg.style.color = 'red';
        msg.textContent = 'Errou!'
    }
    if (quiz.length==document.querySelectorAll('.acerto').length) {
        msg.textContent = 'Parabéns, você acertou tudo!'
    }
}