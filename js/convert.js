function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
function dropDown() {
    var json_obj = JSON.parse(Get('https://free.currencyconverterapi.com/api/v5/currencies'));
    let select = document.getElementById('dd');
    var select2 = document.getElementById('dd2');
    for ( const key of Object.keys(json_obj.results)){
        var option = document.createElement('option');
        option.text = json_obj.results[key].id;
        select.add(option);

    }
    for ( let key of Object.keys(json_obj.results)){
        var option = document.createElement('option');
        option.text = json_obj.results[key].id;
        select2.add(option);

    }


}

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    var query = fromCurrency + '_' + toCurrency;

    var url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+ query;
    var json_object2 = JSON.parse(Get(url));
    var val = json_object2.results[query]['val'];
    if(val){
        var total = val * amount;
        cb(null, Math.round(total * 100)/ 100);
    }else {
        var err = new Error("Value not found for " + query);
        console.log(err);
        cb(err);
    }

}
function registerServiceWorker() {
    if (!navigator.serviceWorker)
        return;
    navigator.serviceWorker.register('js/sw/index.js').then(function () {
        console.log('registration worked!');
    }).catch(function () {
        console.log('registration failed!');
    })
}



function doNow() {
    document.getElementById('second').value = 2;

}
// var myBtn = document.getElementById('btn');
// myBtn.onclick = doNow();
registerServiceWorker();