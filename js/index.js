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
            opt2.innerHTML =  item;

            select2.appendChild(opt2);
        }
    })
}

getCurrencyList();
const  btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    const input = document.getElementById('first');
    const second = document.getElementById('second');
    //const url = `${this.convertURL}${from}_${dest}&compact=ultra&apiKey=${apiKey}`;
    const url = `${convertURL}${select1.value}_${select2.value}&compact=ultra&apiKey=a4ea424ae0960f4369ea`;
    fetch(url).then((response)=>{
        return response.json();
    }).then((myJson)=>{
        second.value = input.value * myJson[`${select1.value}_${select2.value}`];
    })});