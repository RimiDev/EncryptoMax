"use strict";
//Global name space
var g = {
//Perfect regex for english character base
"notEnglishPhrase": /[A-Za-z0-9 _.,!"'/$]*/,

"cityRegex": /^[A-Z]{1}[a-z]+$/,

"selectCharOptions":
["KEY","A","B","C","D","E","F","G","H","I","J","L","M",
"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],

"selectWeatherOptions":
["127774","127780","127785","127783","10054","9928","127787"],

"selectWeatherIDs":
["Clear","Clouds","Thunderstorm","Rain","Snow","Shower Rain","Mist"]



};
//var selectEmojiOptions =
//["12851",""];

function isModernBrowser(){
  console.log("hi")
  if (document.addEventListener || String.fromCodePoint){
    console.log("Modern Browser");
    return true;
  } else if (document.attachEvent){
    console.log("Old Browser");
    return false;
  }
}

function clear(){
  g.messageArea.value = "";
  g.resultArea.value = 'Type in a message to see the results!';
}
//Programitically creating a selection for the non-modern browser users
function createCharList(){
  //Creating the select tag and appending it to the end of the key_selector section
  var selectList = document.createElement("select");
  selectList.id = "key_selector";
  g.keyArea.appendChild(selectList);
  //Creating the options and incrementing the key values
  for (var i = 0; i < g.selectCharOptions.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.id = g.selectCharOptions[i];
    option.text = g.selectCharOptions[i];
    selectList.appendChild(option);
  }
}
//Programitically creating a selection for the modern browser users
function createEmojiList() {
  //Creating the select tag and appending it to the end of the key_selector section
  var selectList = document.createElement("select");
  selectList.id = "key_selector";
  g.keyArea.appendChild(selectList);
  //Creating counter to satisify each emoji's value from 0-80 range.
  var emojiCount = 1;
  //Creating the first key called 'key' which is set to 0. No encryption at all
  var option = document.createElement("option");
  option.value = 0;
  option.text = "KEY";
  selectList.appendChild(option);
  //Creating the options and incrementing the key values
  //the options being the emojis
  for (var j = 1; j < 9; j++){
    for ( var i = 0; i < 10; i++) {
      var option = document.createElement("option");
      option.value = emojiCount;
      emojiCount++;
      //option.id
      option.text = String.fromCodePoint(parseInt("1285" + j + i));
      selectList.appendChild(option);
    }
  }
  //Creating the options for the weather emojis and adding them to the end of
  //the list of emojis
  for (var i = 0; i < g.selectWeatherOptions.length; i++){
    var option = document.createElement("option");
    option.value = emojiCount;
    emojiCount++;
    option.text = String.fromCodePoint(g.selectWeatherOptions[i]);
    option.id = g.selectWeatherIDs[i];
    selectList.appendChild(option);
  }
}

function encryptWeatherOption(){
  if (g.isModern){ //Weather Option only available for modern browsers
    if (g.encryptionType.value == "encrypt_weather"){
      g.keyOption.disabled = true;
      g.cityName.style.visibility = "visible";
      clear();
      g.isWeatherOption = "true";
      g.keyOption.selectedIndex = 0;
    } else {
      g.keyOption.disabled = false;
      g.cityName.style.visibility = "hidden";
      clear();
      g.isWeatherOption = "false";
      g.weather.innerHTML = "";
      g.keyOption.selectedIndex = 0;
      g.cityInput.placeholder = "Enter a city"
      g.cityInput.className = "";
    }
  } else {

  }
}

function encryptMessage(message) {
  if (!g.notEnglishPhrase.test(message)) {
    return;
  }
  var key = parseInt(g.keyOption.value);
  if (key > -1 || key < 3){
 shift(message, key);
 } else {
   console.log("keyError");
 }
}

function shift(message, key) {
  // Simple shift algorithum, might change it later to fancy it up, make it
  // more unpredicitable.
  var shifter = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()[]|;:'\",<.>/?`~-_=+";
  var cipherText = "";
  for (var i = 0; i < message.length; i++) {
    var c = message[i];
    var position = shifter.indexOf(c);
    if (position !== -1) {
      var newPosition = (position + key) % shifter.length;
      cipherText += shifter[newPosition];
    } else {
      // leave as is
      cipherText += c;
    }
  }
  if (cipherText.length !== message.length) {
    console.log("Something is horribly wrong");
  }
  g.resultArea.value = cipherText;
}

function upd()
{
    encryptMessage(g.messageArea.value);
    window.setTimeout('upd()', 100);
}

function weatherCityMessage(){
  if (!g.cityRegex.test(g.cityInput.value)) {
    g.cityInput.className = "Error_input";
    g.cityInput.innerHTML = "";
    g.cityInput.value = "";
    g.cityInput.placeholder = "Please enter a valid city"
    console.log("Please enter a correct city name.");
    return;
  }
  requestWeather(g.cityInput.value);
  for (var i = 81; i < 88; i++){
    if (g.keyOption.options[i].id == g.givenWeather){
      g.keyOption.selectedIndex = i;
      g.weather.innerHTML = g.givenWeather;
      g.cityInput.className = "";
    }
  }
  if (!g.givenWeather == g.keyOption.options[g.keyOption.selectedIndex].id){
    //Put it to default; no given emoji for given weather.
    g.keyOption.selectedIndex = 0;
  }

}

function requestWeather(city){
  if (g.isModern){
  var request = new XMLHttpRequest();
  console.log('xmlhtml')
} else {
  var request = new ActiveXObject("Microsoft.XMLHttp");
  console.log('microxml')
}
  var api_id = "&APPID=5b62062bcde765f123614e4c944f8027";
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + api_id;
  request.open("GET", url, false);
  console.log('open')
  request.send(null);
  if (g.isModern){
    console.log('addEvent')
  addEvent(request,"load", requestAccept(request));
    } else {
      console.log('onready')
  request.onreadystatechange = requestAccept(request);
    }
}

function requestAccept(request){
  if (request.readyState === 4 && request.status === 200){
     console.log(request.getResponseHeader("content-type"));
     var weather = request.responseText;
     console.log(request.responseText)
     console.log(weather);
     var parsedWeather = JSON.parse(weather);
     g.givenWeather = parsedWeather.weather[0].main;
     console.log(parsedWeather.weather[0].main);
  } else {
    console.log('request went wrong!');
  }
}

function addEvent(obj, type, func) {
  if (obj && obj.addEventListener) {
    //modern browser
    obj.addEventListener(type, func, false);
  } else if (obj && obj.attachEvent) {
    //non-modern browser
    obj.attachEvent("on" + type, func);
  }
}

//Event handlers
window.onload = function () {
  g.messageLabel = document.getElementById('plainText_label');
  g.messageArea = document.getElementById('plainText_input');
  g.resultLabel = document.getElementById('cipherText_label');
  g.resultArea = document.getElementById('cipherText_input');
  g.keyArea = document.getElementById('key_section');
  g.isModern = isModernBrowser();
  //If user is non-modern browser, then will recieve this setup
  if (!g.isModern) {
  createCharList();
  g.weatherType.disabled = true;
} else {
  createEmojiList();
  g.encryptionType = document.getElementById('encrypt_type');
  g.weatherType = document.getElementById('weather_select');
  g.citySubmit = document.getElementById('city_submit');
  g.cityName = document.getElementById('city_name');
  g.cityInput = document.getElementById('city_input');
  g.weather = document.getElementById('weather');
  g.weatherType.disabled = false;
  g.weatherType.style.visibility = "visible";
}
  g.keyOption = document.getElementById('key_selector');

  addEvent(g.keyArea,"change", clear);
  addEvent(g.encryptionType,"change", encryptWeatherOption);
  addEvent(g.citySubmit,"click",weatherCityMessage);
  g.citySubmit.addEventListener("click", weatherCityMessage);


  upd();
};
