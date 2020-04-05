function pointsAll() {
    endpoint = 'https://user.tjhsst.edu/2021smedaram/house_getPointsAllocation';
    window.location.href = endpoint
}

function deleteUser() {
    var user_name = document.querySelector("select[name='delete_user']").value;
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/house_deleteUser",
        'type'    : "get",
        'data'    : {'username': user_name},
        'success' : onServerResponse
    }
    $.ajax( ajax_params )
}

function reset() {
    console.log("Resetting users/points")
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/house_reset",
        'type'    : "get",
        'data'    : {},
        'success' : onServerResponse
    }
    $.ajax( ajax_params )
}

function getUsersByHouse() {
    var users_by_house = document.querySelector("select[name='users_by_house']").value;
    endpoint = 'https://user.tjhsst.edu/2021smedaram/house_getUsersByHouse?house_name=' + users_by_house
    window.location.href = endpoint
}

function addUser(){ //start here
    var continu = form_addUser()
    if(continu === true) {
        var user_name = document.querySelector("input[name='user_name']").value;
        var user_house = document.querySelector("select[name='user_house']").value;
        console.log(user_name)
        console.log(user_house)
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/house_addUser",
            'type'    : "get",
            'data'    : { 'user_name' : user_name, "user_house": user_house},
            'success' : onServerResponse
        }
        $.ajax( ajax_params )
    }
}

function getPointsByUser(){ //start here
    var user_poi = document.querySelector("select[name='user_poi']").value;
    console.log(user_poi)
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/house_getPointsByUser",
        'type'    : "get",
        'data'    : { 'user_poi' : user_poi},
        'success' : onServerResponse
    }
    $.ajax( ajax_params )
}

function getPointsByHouse(){ //start here
    var house_poi = document.querySelector("select[name='house_poi']").value;
    console.log(house_poi)
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/house_getPointsByHouse",
        'type'    : "get",
        'data'    : { 'house_poi' : house_poi},
        'success' : onServerResponse
    }
    $.ajax( ajax_params )
}

function award(){
    var continu = form_award()
    console.log(continu)
    if(continu === true)
    {
        var receiverValue = document.querySelector("select[name='receiver']").value;
        var pointsValue = document.querySelector("input[name='points']").value;
        
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2021smedaram/house_awards",
            'type'    : "get",
            'data'    : { 'receiver' : receiverValue, 'points' : pointsValue},
            'success' : onServerResponse
        }
        $.ajax( ajax_params )
    }
}

function form_addUser(){
    var user_n = form_str('user_name', 'message1');
    return (user_n)
}

function form_award() {
    var poi = form_int('points', 'message2')
    return (poi)
}

function onServerResponse (responseText) {
    window.location.href= 'https://user.tjhsst.edu/2021smedaram/house_home?message=' + responseText
    // document.getElementById('titul').innerHTML = "Thank you for submitting your votes";
}


function form_str(elem,mssg) {
    var receiver = document.getElementById(elem)
    var message = document.getElementById(mssg)
    
    console.log(receiver)
    
    if(receiver.value.length <=0)
    {
        message.innerHTML = "Please make sure the " + elem +  " field is at least 1 character!" + "<br/>"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}
function form_int(elem, mssg) {
   var points = document.getElementById(elem)
   var message = document.getElementById(mssg)
   
   console.log(points)
   
   if(points.value.length <=0)
    {
        message.innerHTML = "Please make sure the " + elem + " specified is an integer!" + "<br/>"
        message.style.color = "#F00"
        return false
    }
    else
    {
    return true
    }
}