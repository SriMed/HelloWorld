function fetchFromServer(){
    var continu = formval()
    console.log(continu)
    if(continu === true)
    {
        var radioValue = document.querySelector("input[name='animal']:checked").value;
        var namevalue = document.querySelector("input[name='n']").value;
        var emailvalue = document.querySelector("input[name='email']").value;
        console.log(radioValue)
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/voting_worker",
            'type'    : "get",
            'data'    : { 'animal' : radioValue, 'name' : namevalue, 'email': emailvalue},
            'success' : onServerResponse
        }
        $.ajax( ajax_params )
    }
}

function onServerResponse (responseText) {
    console.log(responseText);
    document.getElementById('titul').innerHTML = "Thank you for voting";
    document.getElementById('content-main').innerHTML = responseText;
}

function formval() {
    var ema = formemail()
    var nama = formname()
    return (ema && nama)
}

function formemail() {
    var email = document.getElementById('email')
    var message = document.getElementById('message')
    if(email.value.indexOf('@') == -1)
    {
        message.innerHTML = message.innerHTML + "<br/>"+ "Please make sure your email is valid"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}
function formname() {
   var name = document.getElementById('n')
   var message = document.getElementById('message')
   
   if(name.value.length <= 0)
    {
        message.innerHTML = message.innerHTML + "<br/>" + "Please make sure your name is at least 1 character!" + "<br/>"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}