let i = 10;
const timer = () => {
    if (i) console.log(`A bomba explodirá em ${i--} segundo${i?'s':''}`); 
    else {console.log("KABUUUUM"); clearInterval(intervalID);}
}

timer();
const intervalID = setInterval(timer,1000);