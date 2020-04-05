function login(){
    console.log("got to login")
    var continu = formvallogin()
    console.log(continu)
    if(continu === true)
    {
        var userValue = document.querySelector("input[name='username']").value;
        var passValue = document.querySelector("input[name='password']").value;
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/cookiecontent",
            'type'    : "get",
            'data'    : { 'user' : userValue, 'pass': passValue, 'login': true},
            'success' : onServerResponseLogin
        }
        $.ajax( ajax_params )
        
        window.location.href = 'https://user.tjhsst.edu/2021smedaram/profile_logout'
    }
}

function onServerResponseLogin (responseText) {
    console.log(responseText);
    document.getElementById('titul').innerHTML = "Thank you for loggin in. Enjoy your box";
    document.getElementById('content-main').innerHTML = responseText;
}

function formvallogin() {
    var user = formuser()
    var pass = formpass()
    return (user && pass)
}

function formuser() {      //edit these to make for user and pass are not nothing
    var guess = document.getElementById('username')
    var message = document.getElementById('error_message1')
    if(guess.value.length == 0)
    {
        message.innerHTML = "Please make sure your username is valid"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}
function formpass() {      //edit these to make for user and pass are not nothing
    var guess = document.getElementById('password')
    var message = document.getElementById('error_message2')
    if(guess.value.length == 0)
    {
        message.innerHTML = "Please make sure your password is valid"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}