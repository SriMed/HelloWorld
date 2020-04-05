
// setInterval(doSomething, 1000)

function fetchFromServer(){
    var continu = formval()
    console.log(continu)
    if(continu === true)
    {
        var statevalue = document.querySelector("select[name='liveState']").value;
        var namevalue = document.querySelector("input[name='n']").value;
        var emailvalue = document.querySelector("input[name='email']").value;
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/mapWorker",
            'type'    : "get",
            'data'    : { 'liveState' : statevalue, 'name' : namevalue, 'email': emailvalue},
            'success' : onServerResponse
        }
        $.ajax( ajax_params )
    }
}

function onServerResponse (responseText) {
    console.log(responseText);
    document.getElementById('titul').innerHTML = "Thank you for submitting";
    document.getElementById('content-main').innerHTML = responseText;
}

function formval() {
    var ema = formemail()
    var nama = formname()
    return (ema && nama)
}

function formemail() {
    var email = document.getElementById('email')
    var message = document.getElementById('email_error_message')
    if(email.value.indexOf('@') == -1)
    {
        message.innerHTML = "<br/>"+ "Please make sure your email is valid"
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
   var message = document.getElementById('name_error_message')
   
   if(name.value.length <= 0)
    {
        message.innerHTML = "<br/>" + "Please make sure your name is at least 1 character!" + "<br/>"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}

// var content = document.getElementsByClassName('states')
// console.log(states)
// var states = content[0].getElementsByTagName('path')
// console.log(states)

// function doClick() {
//     alaska.style['fill'] = 'none';
// }

// var alaska = document.getElementById('AK');
// alaska.onclick = doClick;


// var VA = document.getElementById('VA');
// VA.onclick = function(ev) {
//     console.log(ev);
// }

// function doClick(state, key) {
//     document.getElementById('senators').innerHTML = statesToSenators[key][0];
//     console.log("got here")
//     if(statesToSenators[key][1] == "Republican") {
//         state.style['fill'] = "red";
//     }
//     else {
//         state.style['fill'] = "blue";
//     }
    
// }