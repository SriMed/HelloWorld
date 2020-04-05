function totalguess(){
    var continu = formvalcontent()
    console.log(continu)
    if(continu === true)
    {
        var guessValue = document.querySelector("input[name='guess']").value;
        console.log(guessValue)
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/cookie_worker",
            'type'    : "get",
            'data'    : { 'guess' : guessValue},
            'success' : onServerResponseContent
        }
        $.ajax( ajax_params )
    }
}

function onServerResponseContent (responseText) {
    console.log("got to replace guess")
    console.log(responseText);
    document.getElementById('titul').innerHTML = "Your guess is:";
    document.getElementById('guessid').innerHTML = responseText;
}

function formvalcontent() {
    var ema = formguesscontent()
    return ema
}

function formguesscontent() {
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