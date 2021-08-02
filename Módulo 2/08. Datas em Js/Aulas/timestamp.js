const finalDaCopa = new Date(2002,5,30,8);
const timestamp = +finalDaCopa;
const outroTime = new Date(timestamp+1000*60*60);

console.log(timestamp, finalDaCopa.getTime());

console.log(finalDaCopa,outroTime);