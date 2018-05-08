"use strict";
//Global name space
var g = {
  //Perfect regex for english character base
  "notEnglishPhrase": /[A-Za-z0-9 _.,!"'/$]*/,

  "selectCharOptions":
  ["KEY","A","B","C","D","E","F","G","H","I","J","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
}

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

function decryptMessage(message){
  if (!g.notEnglishPhrase.test(message)) {
    return;
  }
var key = parseInt(g.keyOption.value);
shift(message,key);
}

function shift(message,key) {
  var shifter = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()[]|;:'\",<.>/?`~-_=+";
  var plainText = "";
  for (var i = 0; i < message.length; i++) {
    var p = message[i];
    var position = shifter.indexOf(p);
    if (position !== -1) {
      var newPosition = (position - key) % shifter.length;
      plainText += shifter[newPosition];
    } else {
      // leave as is
      plainText += p;
    }
  }
  if (plainText.length !== message.length) {
    console.log("Something is horribly wrong");
  }
  g.resultArea.value = plainText;
}

function upd(){
  decryptMessage(g.messageArea.value);
  window.setTimeout('upd()',100);

}

//Event handlers
window.onload = function () {
  g.messageLabel = document.getElementById('plainText_label');
  g.messageArea = document.getElementById('plainText_input');
  g.resultLabel = document.getElementById('cipherText_label');
  g.resultArea = document.getElementById('cipherText_input');
  g.keyArea = document.getElementById('key_section');
  g.encryptionType = document.getElementById('encrypt_type');
  g.isModern = isModernBrowser();
  //If user is non-modern browser, then will recieve this setup
  if (!g.isModern) {
  createCharList();
} else {
  createEmojiList();
}
g.keyOption = document.getElementById('key_selector');

addEvent(g.keyArea,"change", clear);

upd();
};
