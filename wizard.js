"use strict";

var g = {
  "currentPage": 0,
  "totalPage": 5,
  "maxPage": 4
}

function nextPage(){
  if (g.currentPage == g.maxPage){
    g.next.disabled = true;
  } else {
    g.next.disabled = false;
    g.previous.disabled = false;
  }
  g.currentPage++;
  g.pagesLeft.innerHTML = g.currentPage + "/" + g.totalPage;
  changePage(1)
}

function previousPage(){
  if (g.currentPage == 1){
    g.previous.disabled = true;
    g.currentPage--;
    g.pagesLeft.innerHTML = g.currentPage + "/" + g.totalPage;
    changePage(-1);
  } else {
      g.previous.disabled = false;
      g.next.disabled = false;
      g.currentPage--;
      g.pagesLeft.innerHTML = g.currentPage + "/" + g.totalPage;
      changePage(-1);
  }
}

function changePage(call){
  if (call == 1){
  var x = g.currentPage;
  var nextPageShowing = document.getElementById(x);
  x--;
  var currentPageShowing = document.getElementById(x);
  currentPageShowing.style.display = "none";
  nextPageShowing.style.display = "block";
} else {
  var x = g.currentPage;
  var previousPageShowing = document.getElementById(x);
  x++;
  var currentPageShowing = document.getElementById(x);
  currentPageShowing.style.display = "none";
  previousPageShowing.style.display = "block";
  console.log(x)

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


window.onload = function (){
g.next = document.getElementById('wizard_next');
g.previous = document.getElementById('wizard_previous');
g.pagesLeft = document.getElementById('wizard_pagesLeft');

//Event Handlers
addEvent(g.next, "click", nextPage);
addEvent(g.previous, "click", previousPage);

}
