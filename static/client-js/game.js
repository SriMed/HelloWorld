
//have to have a method that checks for duplicates

var freeze = false;
var time = 60;
function updateTimer() {
    if(time == 0){
        freeze = true;
        document.getElementById("submit").disabled = true;
        document.getElementById("message").innerHTML = "YOUR TIME IS UP! \n Please either select 'Results' button to view your leaderboard stats or refersh to try again.";
        document.getElementById("results").disabled = false;
    }
    else {
        time = time - 1;
        timerobj = document.getElementById("timer");
        message = time + " seconds left on the clock!";
        timerobj.innerHTML = message
    }
}

function submitWord() { //needs to send this to the server so that it can check if its a word
    
    var wordValue = document.querySelector("input[name='word']").value;
    console.log(wordValue)
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/game_check_word",
        'type'    : "get",
        'data'    : { 'word' : wordValue},
        'success' : checkWord
    }
    $.ajax( ajax_params )
}

function checkWord(response) {
    var tally = document.getElementById('tally');
    tally.innerHTML = response;
}

function on_body_load() {
    setInterval(updateTimer, 1000)
    document.getElementById("results").disabled = true;
    // make_box_outlines()
    // make_clock()
}
// function make_box_outlines() {
//     var canvas = document.getElementById('main');
//     if(canvas !== null) {
//         console.log("Drawing the clock")
//         if (canvas.getContext) {
//             var ctx = canvas.getContext('2d');
//             for (i = 0; i < 6; i++) {
//               ctx.strokeRect(25, 25, 100, 100)
//             }
//         }
//     }
// }
function make_clock() {
  var canvas = document.getElementById('clock');
  if(canvas !== null) {
      console.log("Drawing the clock")
      if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
          ctx.strokeStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
          ctx.moveTo(110, 75);
          ctx.stroke();
      }
  }
}