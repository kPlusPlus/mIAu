function onLoad() {
    map = new Microsoft.Maps.Map(document.getElementById('divmapa'), {});

    $("#countryId").change(function () {
        var selCountry = $("option:selected", $("#countryId")).attr('countryid');
        getStates(selCountry);
    });

    $("#stateId").change(function () {
        var selState = $("option:selected", $("#stateId")).attr('stateid');;
        getCities(selState);
    });

    $("#cityId").change(function () {
        var selCountry = $("option:selected", $("#countryId")).attr('countryid');
        var selState = $("option:selected", $("#stateId")).attr('stateid');
        var cityname = $("#cityId").val();
        //var urlspecial = "http://159.69.113.252/~kapluspl/tmp/cityall.php?country=" + selCountry + "&city=" + cityname;
        var strquery = 'country=' + encodeURIComponent(selCountry) + '&city=' + encodeURIComponent(cityname);
        var urlspecial = "http://159.69.113.252/~kapluspl/tmp/cityall.php?" + strquery;

        $.ajax({
            url: urlspecial,
            cache: false,
            dataType: 'JSON',
            tyoe: 'POST',
            success: function (data) {
                //alert(data);    
                if (data.length > 0) {
                    var lo = data[0].lon4;
                    var la = data[0].lat4;
                    $("#lon4").val(lo).trigger('create');
                    $("#lat4").val(la).trigger('create');
                }
                else {
                    $("#lon4").val(0).trigger('create');
                    $("#lat4").val(0).trigger('create');
                    alert("location no found ");
                }
            },
            fail: function (data) {
                alert("error 17. " + data);
            }

        });
    });
}


/* INIT */
    var USRID = -1;
    var map;
    var lat, lon;

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
    var stype = 'getCountries';
    $.ajax({
        url: 'https://geodata.solutions/api/api.php?type=getCountries',
        method: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {

            if (data.tp == 1) {
                var listlen = Object.keys(data['result']).length;
                if (listlen > 0) {
                    $.each(data['result'], function (key, val) {
                        var option = $('<option />');
                        option.attr('value', val).text(val);
                        option.attr('countryid', key);
                        $('#countryId').append(option);
                    });
                }
            }

            $("#stateId").empty();
            $("#cityId").empty();
            // must to clear all span
            $("span.countries").remove();
            $('span.states').remove();
            $('span.cities').remove();
        },
        fail: function (data) {
            alert('Err 4. Country list problem');
        }
    });
}


function getStates(id) {
    $(".states option:gt(0)").remove();
    $(".cities option:gt(0)").remove();
    //get additional fields
    var stateClasses = $('#stateId').attr('class');
    var cC = stateClasses.split(" ");
    cC.shift();

    var addParams = '';
    var addClasses = '';
    if (cC.length > 0) {
        acC = cC.join();
        addClasses = '&addClasses=' + encodeURIComponent(acC);
    }
    var rootUrl = "https://geodata.solutions/api/api.php";
    var urlspecial = rootUrl + '?type=getStates&countryId=' + id + addParams + addClasses;
    var method = "post";
    //var data = {};
    $('.states').find("option:eq(0)").html("Please wait..");
    //call.send(data, url, method, function (data) {
    // OVO SE MORA PREPISATI
    //$.getJSON(url, function (data) {
    $.ajax({
        url: urlspecial,
        method: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            //$('.states').find("option:eq(0)").html("Select State");
            if (data.tp == 1) {
                if (data.hits > 1000) {
                    console.log('Daily geodata.solutions request limit exceeded:' + data.hits + ' of 1000');
                }
                else {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }
                //var options = [];
                $.each(data['result'], function (key, val) {
                    var option = $('<option />');
                    option.attr('value', val).text(val);
                    option.attr('stateid', key);
                    $('.states').append(option).trigger('create');
                    //options.push(option);
                });
                //$('.states').append(options).trigger('create');                
                $(".states").prop("disabled", false);
                //$('#stateId').slideUp();
                //$(".states").click();
                $('.states').find("option:eq(0)").html("Select state");
                $('span.states').remove();
                $('span.cities').remove();
            }
            else {
                alert(data.msg);
            }
        },
        error: function (err) {
            alert("error" + err);
        }
    }); // završi

};


function getCities(id) {
    $(".cities option:gt(0)").remove();
    //get additional fields
    var stateClasses = $('#cityId').attr('class');

    var cC = stateClasses.split(" ");
    cC.shift();
    var addClasses = '';
    if (cC.length > 0) {
        acC = cC.join();
        addClasses = '&addClasses=' + encodeURIComponent(acC);
    }
    var addParams = '';
    var rootUrl = "https://geodata.solutions/api/api.php";
    var urlspacial = rootUrl + '?type=getCities&countryId=' + $('#countryId option:selected').attr('countryid') + '&stateId=' + id + addParams + addClasses;
    var method = "post";
    var data = {};
    $('.cities').find("option:eq(0)").html("Please wait..");
    //call.send(data, url, method, function (data) {
    //$.getJSON(url, function (data) { // promjena
    $.ajax({
        url: urlspacial,
        method: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {

            $('.cities').find("option:eq(0)").html("Select City");
            if (data.tp == 1) {
                if (data.hits > 1000) {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded count:' + data.hits + ' of 1000');
                }
                else {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }

                var listlen = Object.keys(data['result']).length;

                if (listlen > 0) {
                    $.each(data['result'], function (key, val) {

                        var option = $('<option />');
                        option.attr('value', val).text(val);
                        $('.cities').append(option);
                    });
                }
                else {
                    var usestate = $('#stateId option:selected').val();
                    var option = $('<option />');
                    option.attr('value', usestate).text(usestate);
                    option.attr('selected', 'selected');
                    $('.cities').append(option);
                }
                $('span.cities').remove();
                $(".cities").prop("disabled", false);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (data) {
            alert("error 18 " + data);
        }
    });
};

/* preloader */
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
    }
    );
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

$("#usrlogon").tap(function () {

    var useremail = $("#useremail").val();
    var userpsw = $("#userpsw").val();

    if (useremail == "") {
        alert("Input user email");
        $("#useremail").focus();
        return false;
    }

    if (userpsw == "") {
        alert("Input user password");
        $("#userpsw").focus();
        return false;
    }

    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/cmemb.php',
        data: { "useremail": useremail, "userpsw": userpsw },              // $('#formA').serialize(),
        type: "POST",
        success: function (data) {            
            if (data === 'no user') {
                alert("no user with this login");
                return false;
            }
            HideAll();
            ShowPage(2);
            USRID = data;            
        },
        fail: function (data) {
            alert('Err 16. Internet connection problem');
        }
    }
    );


    
})

$("#btnpublic").tap(function () {
    HideAll();
    ShowPage(2);
});

$("#btnhome").tap(function () {
    HideAll();
    ShowPage(1);
});

$("#btnlogin").tap(function () {
    HideAll();
    ShowPage(3);
});

function HideAll() {

    $("#body1").hide();
    $("#body2").hide();
    $("#body3").hide();
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


function getPosition() {
    
    var options = {
        enableHighAccuracy: true,
        maximumAge: Infinity,
        timeout: 10000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        // debug only alert
        showMessage('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        return true;
    };

    function onError(error) {
        showMessage('code 12 : ' + error.code + '\n' + 'message: ' + error.message + '\n');
        return false;
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
        showMessage('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
    };

    function onError(error) {
        alert('error 505 code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

$("#btnmypos").tap(function () {
    //getPosition();
    //GetMap();
    getLocation();

    //$("#userid").val(10);
    $("#gamelat").val(lat);
    $("#gamelon").val(lon);

    if (lat == undefined) return false;
    if (lon == undefined) return false;


    var urlspecial = "http://159.69.113.252/~kapluspl/tmp/game.php";
    var membyid = $("#userid").val();
    $.ajax({
        url: urlspecial,
        data: { MEMBYID: membyid, lon: lon, lat: lat },
        type: 'POST',
        success: function (data) {            
            showMessage(data);
        },
        fail: function (data) {
            showMessage("error 18. " + data);
        }
    });

});


$("#btnneighbour").tap(function () {
    showMessage("tap tap tap");    
});


function GetMap() {
    /*
    var map = new Microsoft.Maps.Map('#divmapa', {
        credentials: "AusV1uMb4S4PqNZj3miJ4KX2HkfIoZzGHu8ZUfGN7RxCP2y41-OHeWMtBEAHLr3I"
    });
    */
    var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }

    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);

        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });

}

function showMessage(mess) {
    navigator.notification.alert(
        mess,   // message
        null,   // callback
        'Info', // title
        'Done'  // buttonName
    );
}

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    showMessage("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
    if (err.code == 1) {
        showMessage("Error: Access is denied!");
    } else if (err.code == 2) {
        showMessage("Error: Position is unavailable!");
    } else if (err.code == 3) {
        showMessage("Error TIMEOUT SHUT");
    }
}

function getLocation() {

    if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
        showMessage("Sorry, browser does not support geolocation!");
    }
}