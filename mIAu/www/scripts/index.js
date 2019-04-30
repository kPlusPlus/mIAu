function onLoad() {
    map = new Microsoft.Maps.Map(document.getElementById('divmapa'), {});

    $("#countryId").change(function () {

        var selCountry = $("option:selected", $("#countryId")).attr('countryid');
        getStates(selCountry);

    });
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

        },
        fail: function (data) {
            alert('Err 4. Country list problem');
        }
    });
}


// ToDo: new function
/*
function TakeCountry() {
    var rootUrl = "//geodata.solutions/api/api.php?type=getCountries";
    var call = new ajaxCall();    
    var url = rootUrl;
    var method = "post";
    var data = {};

    //$.getJSON(rootUrl, function (data) {
    call.send(data, url, method, function (data) {
        alert(data);
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

    });
}
*/

/*

$("#countryId").change(function () {
    var selCountry = $("option:selected", $("#countryId")).attr('countryid');
    getStates(selCountry);
});

$('#stateId').change(function () {
    var selState = $("option:selected", $("#stateId")).attr('stateid');;
    getCities(selState);
});

$(document).on('change', '#stateId', function () {
    alert("Changed!");
});

*/


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
    var rootUrl = "//geodata.solutions/api/api.php";
    var urlspacial = rootUrl + '?type=getCities&countryId=' + $('#countryId option:selected').attr('countryid') + '&stateId=' + id + addParams + addClasses;
    var method = "post";
    var data = {};
    $('.cities').find("option:eq(0)").html("Please wait..");
    //call.send(data, url, method, function (data) {
    //$.getJSON(url, function (data) { // promjena
    $.ajax ({
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
        alert('code 12 : ' + error.code + '\n' + 'message: ' + error.message + '\n');
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
    getPosition();
    GetMap();

    $("#userid").val(10);
    $("#gamelat").val(lat);
    $("#gamelon").val(lon);

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


function ajaxCall() {
    this.send = function (data, url, method, success, type) {
        type = type || 'json';
        var successRes = function (data) {
            success(data);
        }

        var errorRes = function (e) {
            console.log(e);
            //alert("Error found \nError Code: "+e.status+" \nError Message: "+e.statusText);
            //$('#loader').modal('hide');
        }
        $.ajax({
            url: url,
            //cache: false,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });

    }

}

