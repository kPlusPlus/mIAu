
$(document).on('pagecreate', '#app', function () {
    //code
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.notification);
}

$(document).on("tap", "#btnCountry", function () {
    TakeCountry();
    return false;
    //alert("ALL RIGHT");
});

/*
$("#btnCountry").tap(function () {
    //alert("H1 234");
    //TakeAll();
    TakeCountry();
});
*/

$("#btnTest").tap(function () {
    alert("RRR");
    TakeAll();
})

$(document).on("change", "#selcountry", function () {
    //alert("WORKING...");
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
    //$("#divcountry").empty();
    
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