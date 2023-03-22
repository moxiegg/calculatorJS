dis = document.querySelector(".screen div");
function display(e){
    if(dis.textContent=="0")dis.textContent="";
    dis.textContent+=e.target.textContent;
}
keys = document.querySelectorAll(".keys div");
keys.forEach(key=>{
    key.addEventListener('click',display);
});
off = document.querySelector("#off");
off.addEventListener('click',()=>{
    dis.textContent="";
});
clear = document.querySelector("#clear");
clear.addEventListener('click',()=>{
    dis.textContent="0";
});