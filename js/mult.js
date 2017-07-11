// Инициализация
var x;
var y;
var step = 0;
var arr = [];
var timerId;
for (i = 2; i < 3; i++) {
  for (j = 2; j < 3; j++) {
    //arr.push( [i, j, 0, Math.random()] );
    arr.push({x: i, y: j, wrCorr: 0, variant: Math.random()});
  }
}

arr.sort(function (a, b) {
  return a.variant - b.variant;
}
);

function fillSection2() {
  x = arr[step].x;
  y = arr[step].y;
  document.getElementsByClassName("argx")[0].innerHTML = x;
  document.getElementsByClassName("argy")[0].innerHTML = y;
  answer.value = "";
  answer.focus();
}

function time(sec) {
  var x;
  var arrHss;
  var mm;
  var ss;
  var minSec;
  if (sec === undefined) {
    x = document.getElementById('hide').value;
    arrHss = x.split(':');
    mm = +arrHss[0];
    ss = +arrHss[1];
    minSec = mm * 60 + ss;
  } else {
    minSec = sec;
  }
  minSec -= 1;
  mm = Math.floor(minSec / 60);
  ss = minSec % 60;
  if (ss < 10) {
    ss = "0" + ss;
  }
  document.getElementById('tmr').innerHTML = mm + ":" + ss;
  if (minSec > 0) {
    timerId = setTimeout("time(" + minSec + ")", 1000);
  } else {
    clearTimeout(timerId);
    alert ("Время вышло!");
    //document.getElementById("tmr").style.display = "none";
    showResult();
  }  
}

function compareResult() {
  if (x * y == answer.value) {
    arr[step].wrCorr = 1;
  } else {
    arr[step].wrCorr = -1;
    alert("Ошибка");
  }
  getNextStep();
  fillSection2();
}

function getNextStep() {
  for (i = step + 1; i < arr.length; i++) {
    if (arr[i].wrCorr == 0 || arr[i].wrCorr == -1) {
      step = i;
      return;
    }
  }
  showResult();
}

function showSection(sec) {
  var bl;
  for (i = 1; i <= 3; i++) {
    bl = document.getElementById("section" + i);
    if (sec == i) {
      bl.style.display = "block";
    } else {
      bl.style.display = "none";
    }
  }   
}

function showResult() {
  var wrCnt = 0;
  var rgCnt = 0;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].wrCorr == 1) {
      rgCnt += 1;
    } else if (arr[i].wrCorr == -1) {
      wrCnt += 1;
    }
  }
  clearTimeout(timerId); 
  if (rgCnt == arr.length) {
    document.getElementById("goodboy").style.display = "block";
    document.getElementById("bugs").style.display = "none";   
  } else {
    document.getElementById("goodboy").style.display = "none";
    document.getElementById("bugs").style.display = "block";
  }
  document.getElementById("wrong").innerHTML = wrCnt;
  document.getElementById("right").innerHTML = rgCnt; 
  showSection(3);
}

function keyEnter() {
  document.getElementById("answer").onkeypress = function (e) {
    if (!e)
      e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == "13") {
      compareResult();
      return false;
    }
  }
}

function workOnBugs() {
  for (i = 0; i < arr.length; i++) {
    if (arr[i].wrCorr == -1) {
      step = i;
      showSection(2);
      fillSection2();
      return;
    }
  }
}
