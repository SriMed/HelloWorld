function fetchFromServer(){
    var continu = formval()
    console.log(continu)
    if(continu === true)
    {
        var guessValue = document.querySelector("input[name='guess']").value;
        console.log(guessValue)
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/home_worker",
            'type'    : "get",
            'data'    : { 'guess' : guessValue},
            'success' : onServerResponse
        }
        $.ajax( ajax_params )
    }
}

function onServerResponse (responseText) {
    console.log(responseText);
    document.getElementById('titul').innerHTML = "Please hit refresh to try again. Your guess is:";
    document.getElementById('content-main').innerHTML = responseText;
}

function formval() {
    var ema = formguess()
    return ema
}

function formguess() {
    var guess = document.getElementById('guess')
    var message = document.getElementById('error_message')
    if(guess.value.length == 0)
    {
        message.innerHTML = "Please make sure your input is valid"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}