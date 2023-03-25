keys = document.querySelectorAll(".keys div");
dis = document.querySelector(".screen div");
let a=null,b="",op=null;

//Event Listners
keys.forEach(key=>{
    key.addEventListener('click',display);
});
off = document.querySelector("#off");
off.addEventListener('click',()=>{
    dis.textContent="";
});
clear = document.querySelector("#clear");
clear.addEventListener('click',()=>{
    dis.textContent="";
    a=null;
    b="";
    op=null;
});

let operators=['+','-','*','/','='];
//Functions
function display(e){
    let input = e.target.textContent;
    if(a==null){
        if(operators.includes(input)){
            dis.textContent="Syntax Error";
            a=null;
            b="";
            op=null;
        }
        a=input;
        dis.textContent=a;
    }else if(op==null){
        if(operators.includes(input)){
            op=input;
            dis.textContent+=op;
        }
        else{
            a+=input;
            dis.textContent+=input;
        }
    }else if(b==""){
        if(operators.includes(input)){
            dis.textContent="Syntax Error";
            a=null;
            b="";
            op=null;
        }else{
            b=input;
            dis.textContent+=input;
        }
    }else{
        if(operators.includes(input)){
            calculate(a,b,op,input);
            if(input!='=')dis.textContent+=input;
        }else{
            b+=input;
            dis.textContent+=input;
        }
    }
    console.log(`a:${a}\nb:${b}\nop:${op}\n\n`);
}
function calculate(x,y,oper,input){
        console.log(`a:${a},b:${b},op:${op}`)
        inp1=Number(x);
        inp2=Number(y);
        switch(oper){
            case '+':
                res=inp1+inp2;
                break;
            case '-':
                res=inp1-inp2;
                break;
            case '*':
                res=inp1*inp2;
                break;
            case '/':
                res=inp1/inp2;
                res=Math.round((res + Number.EPSILON) * 100) / 100
                break;
        }
        dis.textContent=res;
        a=res;
        b="";
        if(input!='=')op=input;
        else op=null;
        return;
}