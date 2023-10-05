//
import "./style.css" // 이것이 바로 웹팩 문법이었다. 리액트 문법이 아님
import plus from "./plus.js";
import tiger from './rabbit.png';

console.log(plus(2, 3));
document.addEventListener("DOMContentLoaded",()=>{
    document.body.innerHTML = `<img src="${tiger}"/>`;
})