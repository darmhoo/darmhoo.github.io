// class Main {
//     constructor() {
//         this.currencyURL = "https://free.currencyconverterapi.com/api/v6/currencies?apiKey=a4ea424ae0960f4369ea";
//         this.convertURL = "https://free.currencyconverterapi.com/api/v6/convert?q=";
//     }
//     getCurrencyList() {
//         const topSelect = document.getElementById('dd');
//         const bottomSelect = document.getElementById('dd2');
//
//
//         fetch(this.currencyURL).then((response) => {
//             response.json().then((myJson) => {
//                 // console.log(myJson.results.AED.id);
//                 for (let item in myJson.results) {
//
//                     const opt1 = document.createElement('option');
//                     opt1.value = item;
//                     opt1.innerHTML = item;
//                     topSelect.appendChild(opt1);
//
//
//                 }
//                 for (let item in myJson.results) {
//
//                     const opt2 = document.createElement('option');
//                     opt2.value = item;
//                     opt2.innerHTML = item;
//
//                     bottomSelect.appendChild(opt2);
//
//                 }
//             }).catch((err) => {
//                 console.log("Can't fetch currencies: "+ err);
//             });
//         });
//     }
//
//     getCurrencyConvert(from, dest) {
//         const apiKey = 'a4ea424ae0960f4369ea';
//         const url = `${this.convertURL}${from}_${dest}&compact=ultra&apiKey=${apiKey}`;
//         fetch(url).then((response) => {
//             return response.json();
//         });
//
//     }
//
// }
// const m = new Main();
// m.getCurrencyList();
// const button = document.getElementById('btn');
// button.addEventListener('click', () => {
//     const inputFirst = document.getElementById('first');
//     const topSelect = document.getElementById('dd');
//     const from = topSelect.value;
//     const inputSecond = document.getElementById('second');
//     const bottomSelect = document.getElementById('dd2');
//     const dest = BottomSelect.value;
//     const apiKey = 'a4ea424ae0960f4369ea';
//     const url = `${m.convertURL}${from}_${dest}&compact=ultra&apiKey=${apiKey}`;
//     if (topSelect.textContent !== '--select--' && bottomSelect.innerText !== '--select--'  && !isNaN(inputFirst.value())) {
//         console.log(m.getCurrencyConvert(from, dest));
//     } else {
//         alert('Select any of the currencies');
//     }
// });

const currencyURL = "https://free.currencyconverterapi.com/api/v6/currencies?apiKey=a4ea424ae0960f4369ea";
const convertURL = "https://free.currencyconverterapi.com/api/v6/convert?q=";
const select1 = document.getElementById('dd');
const select2 = document.getElementById('dd2');
function getCurrencyList() {
    fetch(currencyURL).then((response)=>{
        return response.json()
    }).then((myJson)=>{
        for (let item in myJson.results){
            const opt1 = document.createElement('option');
            opt1.value = item;
            opt1.innerHTML = item;
            select1.appendChild(opt1);

        }
        for (let item in myJson.results){
            const opt2 = document.createElement('option');
            opt2.value = item;
            opt2.innerHTML = item;

            select2.appendChild(opt2);
        }
    })
}

getCurrencyList();
const  btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    const input = document.getElementById('first');
    const second = document.getElementById('second');
    second.value = input.value;
});