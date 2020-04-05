function logout(){
    console.log("got to logout")
    var ajax_params = {
        'url'     : "https://user.tjhsst.edu/2021smedaram/cookie_logout",
        'type'    : "get",
        'data'    : {},
        'success' : onServerResponseLogout
    }
    $.ajax( ajax_params )
}

function onServerResponseLogout (responseText) {
    console.log(responseText);
    document.getElementById('content-main').innerHTML = responseText;
}