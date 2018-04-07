
function getCoinPrice(name) {
  var url = "https://coinmarketcap.com/currencies/" + name;
  
  var response = UrlFetchApp.fetch(url);
  var text = response.getContentText();
  
  var re_price = /<span id="quote_price" data-currency-price data-usd="([-\w\d\.]+)">/;
  var found_price = text.match(re_price);
  
  if (found_price != undefined) {
    return parseFloat(found_price[1]);
  }
  else {
    return -1.0;
  }
}

function getCoinPriceInPast(symbol, minutes_in_past) {
  var to = "USD";
  var url = "https://min-api.cryptocompare.com/data/histominute?tsym=USD&limit=60&aggregate=3&e=CCCAGG&fsym=" + symbol;
  
  var response = UrlFetchApp.fetch(url);
  var text = response.getContentText();

  var json = JSON.parse(text);
  
  var price_data = json["Data"];
   
  return parseFloat(price_data[minutes_in_past]["close"]);
}

function getCoinPriceHistory(symbol, minutes_in_past, num_samples) {
  var to = "USD";
  var url = "https://min-api.cryptocompare.com/data/histominute?tsym=USD&aggregate=3&e=CCCAGG&fsym=" + symbol;
  
  var response = UrlFetchApp.fetch(url);
  var text = response.getContentText();

  var json = JSON.parse(text);
  
  var price_data = json["Data"];
   
  var history = [];
  var step_size = Math.floor(minutes_in_past / num_samples);
  var i = 0;
  for (; i < num_samples; i++) {
    history.push(parseFloat(price_data[i * step_size]["close"]));
  }
                 
  return history.reverse();
}
