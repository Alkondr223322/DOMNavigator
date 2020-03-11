let findBtn = document.querySelector('.selector-find');
let nextBtn = document.querySelector('.selector-next');
let prevBtn = document.querySelector('.selector-prev');
let elArr = [];
let current = 0
let style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.selected { outline: solid red 5px; background-color: lightblue; }';
document.getElementsByTagName('head')[0].appendChild(style);
findBtn.onclick = function(){
    let s = document.querySelector('.selector').value;
    // let el = document.querySelector(s);
    // el.style.backgroundColor = 'lightblue';
    // el.style.outline = 'solid red 5px';
    elArr = document.querySelectorAll(s);
    console.log(elArr);
    elArr[0].classList.add('selected');
    // console.log(elArr.length);
    if(elArr.length>1){
        nextBtn.removeAttribute('disabled');
    }
}
nextBtn.onclick = function(){
    prevBtn.removeAttribute('disabled');
    elArr[current].classList.remove('selected');
    current++;
    elArr[current].classList.add('selected');
    if(current>=elArr.length-1) nextBtn.setAttribute('disabled', 'disabled');
}
prevBtn.onclick = function(){
    nextBtn.removeAttribute('disabled');
    elArr[current].classList.remove('selected');
    current--;
    elArr[current].classList.add('selected');
    if(current<1) prevBtn.setAttribute('disabled', 'disabled');
}