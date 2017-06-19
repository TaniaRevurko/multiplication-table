// Инициализация
var x;
var y;
var step = 0;
var arr = [];

for (i = 2; i < 10; i++) {
  for (j = 2; j < 10; j++) {
    arr.push( [i, j, 0, Math.random()] );
  }
}

arr.sort(function(a, b) {
    return a[3] - b[3];
  }
);

function fillSection2() {
  x = arr[step][0];
  y = arr[step][1];
  document.getElementsByClassName("argx")[0].innerHTML = x;
  document.getElementsByClassName("argy")[0].innerHTML = y;
  answer.value = "";
  answer.focus();
}

function compareResult() {
  if (x * y == answer.value) {
    arr[step][2] = 1;
  } else {
    arr[step][2] = -1;
    alert("Ошибка");
  }
  getNextStep();
  fillSection2();
}

function getNextStep() {
  for (i = step + 1; i < arr.length; i++) {
    if (arr[i][2] == 0 || arr[i][2] == -1) {
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
    if (arr[i][2] == 1) {
      rgCnt += 1;
    } else if (arr[i][2] == -1) {
     wrCnt += 1;
    }
  }
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
  document.getElementById("answer").onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == "13") {
      compareResult();
      return false;
    }
  }
}

function workOnBugs() {
  for (i = 0; i < arr.length; i++) {
    if (arr[i][2] == -1) {
    step = i;
      showSection(2);
      fillSection2();
      return;
    }
  }
}
