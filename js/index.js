// import idb from 'idb';
class Main{
    constructor(){
        this.currencyURL = 'https://free.currencyconverterapi.com/api/v5/currencies';
        this.convertUrl = 'https://free.currencyconverterapi.com/api/v5/convert?q=';
    }
    static getData(url){
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url ,false);
        Httpreq.send(null);
        return JSON.parse(Httpreq.responseText);
    }

    openDatabase(){
        let url = this.currencyURL;
        const db_name = 'converter';
        let request = indexedDB.open(db_name, 1);

        request.onerror = function () {
            return;
        }
        request.onupgradeneeded = function () {

            let db = event.target.result;

            let objectStore = db.createObjectStore("countries", {keypath: "id"});
            let objectStore2 = db.createObjectStore("currencies", {keypath: "id"});

            objectStore.createIndex('currencyName', 'currencyName', {unique: true});

            fetch(url).then((resp)=> resp.json).
            then(function (messages) {
                objectStore.transaction.oncomplete = function (event) {
                    let currenciesObjectStore = db.transaction('countries', 'readwrite').objectStore('countries');
                    messages.forEach(function (message) {
                        currenciesObjectStore.add(message);
                    })
                }
            });
            
            objectStore.transaction.oncomplete = function (event) {
                let currenciesObjectStore = db.transaction('countries', 'readwrite').objectStore('countries');
                messages.forEach(function (message) {
                    currenciesObjectStore.add(message);
                })
            }
        }
    }


    registerServiceWorker(){
        if (!navigator.serviceWorker)
            return;
        navigator.serviceWorker.register('sw.js').then(function () {
            console.log('registration worked again!');
        }).catch(function () {
            console.log('registration failed!');
        })
    }
    dropDown(){
        fetch(this.currencyURL).then((resp) => resp.json()).
        then(function(data){
            const select = document.getElementById('dd');
            const select2 = document.getElementById('dd2');
            for ( let key of Object.keys(data.results)){
                let option = document.createElement('option');
                option.text = data.results[key].id;
                select.add(option);}
            for ( let key of Object.keys(data.results)){
                let option = document.createElement('option');
                option.text = data.results[key].id;
                select2.add(option);
        }
        }).catch(function () {
            console.log('waiting');
        });
    }



    convertTask(){
        let btn = document.getElementById('btn');
        let url = this.convertUrl;
        let m = Main.getData;

        btn.onclick = function () {

            let display = document.getElementById('second');
            let amount = document.getElementById('first').value;
            const from_currency = document.getElementById('dd').value;
            const to_currency = document.getElementById('dd2').value;
            let query = `${from_currency}_${to_currency}`;


            fetch(`${url}${query}`).then((resp) => resp.json()).
            then(function (data) {
                let val = data['results'][query]['val'];
                if(val){
                    let total = val * amount;
                    total = Math.round(total * 100)/ 100;
                    display.value = total;
                }
            }).catch(() => console.log('No response received')

            );



        }

    }

}
let m = new Main();
m.openDatabase();
m.registerServiceWorker();
m.dropDown();
m.convertTask();



