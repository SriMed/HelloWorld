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
   var name = document.getElementById('name')
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