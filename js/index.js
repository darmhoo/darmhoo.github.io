class Main{
    constructor(){
        this.currencyURL = 'https://free.currencyconverterapi.com/api/v5/currencies';
        this.convertUrl = 'https://free.currencyconverterapi.com/api/v5/convert?q=';
    }
    getData(url){
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url ,false);
        Httpreq.send(null);
        return JSON.parse(Httpreq.responseText);
    }

    registerServiceWorker(){
        if (!navigator.serviceWorker)
            return;
        navigator.serviceWorker.register('sw/index.js').then(function () {
            console.log('registration worked again!');
        }).catch(function () {
            console.log('registration failed!');
        })
    }
    dropDown(){
        let json_obj = this.getData(this.currencyURL);
        const select = document.getElementById('dd');
        const select2 = document.getElementById('dd2');
        for ( let key of Object.keys(json_obj.results)){
            let option = document.createElement('option');
            option.text = json_obj.results[key].id;
            select.add(option);

        }
        for ( let key of Object.keys(json_obj.results)){
            let option = document.createElement('option');
            option.text = json_obj.results[key].id;
            select2.add(option);

        }

    }
    convertTask(){
        let btn = document.getElementById('btn');
        let url = this.convertUrl;
        let m = this.getData;

        btn.onclick = function () {

            let display = document.getElementById('second');
            let amount = document.getElementById('first').value;
            const from_currency = document.getElementById('dd').value;
            const to_currency = document.getElementById('dd2').value;
            let query = `${from_currency}_${to_currency}`;

            let url_string = `${url}${from_currency}_${to_currency}`;


            let val =  m(url_string);
            val = val['results'][query]['val'];


            if (val){
                let total = val * amount;
                total = Math.round(total * 100)/ 100;
                display.value = total;
            }
        }

    }

}
let m = new Main();
m.registerServiceWorker();
m.dropDown();
m.convertTask();



