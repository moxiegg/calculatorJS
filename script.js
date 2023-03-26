keys = document.querySelectorAll(".keys div");
dis = document.querySelector(".screen div");
let inputKeys = ["1","2","3","4","5","6","7","8","9","0","/","+","-","*","=",".","Enter"];
let operators = ["+", "-", "*", "/", "="];
let a = null,
  b = "",
  op = null;
let input;
let decimal=false;

//Event Listners

keys.forEach((key) => {
  key.addEventListener("click", getInput);
});

clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  dis.textContent = "";
  a = null;
  b = "";
  op = null;
});
back = document.querySelector("#back");
back.addEventListener("click", backspace);


//Functions

function getInput(e){
  input=e.target.textContent;
  display(input);
}

function display(input) {
  if (a == null) {
    if (operators.includes(input)) {
      dis.textContent = "Syntax Error";
      a = null;
      b = "";
      op = null;
      return;
    }
    a = input;
    dis.textContent = a;
  } else if (op == null) {
    if (operators.includes(input)) {
      if(input=="="){
        dis.textContent="Syntax Error";
        a=null;
        b="";
        op=null;
        return;
      }
      op = input;
      dis.textContent += op;
    } else {
      if(a.includes(".")&&input==".")return;
      a += input;
      dis.textContent += input;
    }
  } else if (b == "") {
    if (operators.includes(input)) {
      dis.textContent = "Syntax Error";
      a = null;
      b = "";
      op = null;
    } else {
      b = input;
      dis.textContent += input;
    }
  } else {
    if (operators.includes(input)) {
      calculate(a, b, op, input);
      if (input != "=") dis.textContent += input;
    } else {
      if(b.includes(".")&&input==".")return;
      b += input;
      dis.textContent += input;
    }
  }
  if(input=='.')decimal=true;
//   console.log(`a:${a}\nb:${b}\nop:${op}\n\n`);
}
function calculate(x, y, oper, input) {
  // console.log(`a:${a},b:${b},op:${op}`);
  if(x.charAt(x.length-1)=="."||y.charAt(y.length-1)=="."){
    a=null;
    b="";
    op=null;
    dis.textContent="Syntax Error";
    return;
  }
  inp1 = Number(x);
  inp2 = Number(y);
  switch (oper) {
    case "+":
      res = inp1 + inp2;
      break;
    case "-":
      res = inp1 - inp2;
      break;
    case "*":
      res = inp1 * inp2;
      break;
    case "/":
      if(inp2==0){
        dis.textContent="Syntax Error";
        a=null;
        op=null;
        b="";
        return;
      }
      res = inp1 / inp2;
      res = Math.round((res + Number.EPSILON) * 100) / 100;
      break;
  }
  dis.textContent = res;
  a = res.toString();
  b = "";
  if (input != "=") op = input;
  else op = null;
  return;
}
function backspace() {
  if (a == null) return;
  else {
    if (op == null) {
      a=a.slice(0,a.length-1);
      dis.textContent = a;
      if(a.length==0)a=null
    } else if (op != null) {
      if (b == "") {
        op = null;
        dis.textContent = a;
      } else {
        b=b.slice(0,b.length-1);
        dis.textContent = a + op + b;
      }
    }
  }
//   console.log(`a:${a}\nb:${b}\nop:${op}\n\n`);
}

document.addEventListener('keydown',(e)=>{
  let key=e.key;
  // console.log(key);
  if(key=="Enter"){
    key="=";
  }
  if(inputKeys.includes(key)){
    display(key);
    // console.log(key);
  }else if(key=="Backspace")backspace();
})