
$(document).on('pagecreate', '#app', function () {
    //code
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.notification);
}