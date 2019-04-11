function onLoad() {    
    map = new Microsoft.Maps.Map(document.getElementById('divmapa'), {});    
}

$(document).on("tap", "#btnCountry", function () {
    TakeCountry();
    return false;    
});


$("#btnTest").tap(function () {
    alert("RRR");
    //TakeAll();
})

$(document).on("change", "#selcountry", function () {    
    var codecountry;
    codecountry = $("#selcountry").select().val();
    if (codecountry.length > 1)
        TakeCity(codecountry);
});

// When select city copy cordinate
$(document).on('change', "#selcity", function () {
    //alert("WORKING");
    var opt = $('#selcity option:selected');
    var lo = opt.attr("lon4");
    var la = opt.attr("lat4");
    $("#lon4").val(lo).trigger('create');
    $("#lat4").val(la).trigger('create');
});

$("#btnsub").tap(function () {
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/memby.php',
        data: $("#forma").serialize(),        
        cache: false,
        type: "POST",
        success: function (data) {
            alert("OK " + data);
        },
        fail: function (data) {
            alert("error 7. no enter user " + data);
        }
    });
});

function TakeAll() {
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/countrylist.php',
        cache: false,
        success: function (data) {
            $("#divcountry").html(data);
        },
        fail: function (data) {
            alert('Err 4. Country list');
        }
    });
}

function TakeCountry() {    
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/countrylist.php',
        cache: false,
        success: function (data) {
            $("#divcountry").html(data).trigger('create');;
        },
        fail: function (data) {
            alert('Err 4. Country list problem');
        }
    });
}

$(document).ajaxStart(function () {
    $("#waitcity").css("display", "block");
});
$(document).ajaxComplete(function () {
    $("#waitcity").css("display", "none");
});

function TakeCity(codecountry) {
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/citieslist.php',
        data: { "country": codecountry },              // $('#formA').serialize(),
        type: "POST",
        success: function (data) {
            $("#divcity").html(data).trigger('create');
        },
        fail: function (data) {
            alert('Err 6. Internet connection problem');
        }
    });
}


$("#btntest").tap(function () {
    //alert("EEEEE");
    $.ajax({
        url: 'public.html',
        success: function (data) {
            //alert(data);
            $("#body").html(data).trigger('create');
        }
    });    
});

$("#btnpublic").tap(function () {    
    HideAll();    
    ShowPage(2);    
});

$("#btnhome").tap(function () {
    HideAll();
    ShowPage(1);
});

function HideAll() {

    $("#body1").hide();
    $("#body2").hide();
}

function ShowPage(pageno) {    
    var pagename = "#body" + pageno;
    $(pagename).show("slow");
}

$("#getPosition").tap(function () {
    getPosition();   
});

$("#watchPosition").tap(function () {
    watchPosition();
});

var lat, lon;
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}


function watchPosition() {
    var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

$("#btnmypos").tap(function () {
    //GetMap();
    //getPosition();    
    
    $("#userid").html(123);
    $("#gamelat").html(123);
    $("#gamelon").html(123);    
    
});

var map;
function GetMap() {
    
    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);

        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
    

}

