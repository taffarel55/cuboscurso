const input = 'cAAS';

if (input.slice(1).toUpperCase()==input.slice(1)) {
    let newInput = ""
    for(let i=0; i<input.length;i++) {
        if(input[i]<'[') newInput+=input[i].toLowerCase();
        else             newInput+=input[i].toUpperCase();
    }
    console.log(newInput);
} else console.log(input);