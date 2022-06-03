// initialize and setup facebook js sdk

window.fbAsyncInit = function() {
    FB.init({
        appId      : '250488946382112',
        xfbml      : true,
        version    : 'v2.5'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// login with facebook with extra permissions
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(150).height(150)'}, function (response) {
                document.getElementById('profilePicture').innerHTML = "<img src='" + response.picture.data.url + "'>";
                document.getElementById('status').innerHTML = 'We are connected.';
                document.getElementById('statusAndInfo').innerHTML = "Account ID: " + response.id + ", Name: " + response.name;
            });
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'We are not logged in.'
        } else {
            document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
        }
    }, {scope: 'email'});
}








