
$(document).on('pagecreate', '#app', function () {
    //alert('Network error has occurred please try again!');
    //alert("START NOW");
    //TakeAll();
});


$(document).on("tap", "#btnCountry", function () {    
    //alert("hehehe");
    TakeCountry();
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
    TakeCity(codecountry);
});


function TakeAll() {

    //$("#divcity").empty();
    //$("#divcountry").empty();

    /*
    $.get("http://159.69.113.252/~kapluspl/tmp/citieslist.php", function (data) {
        $("#divcity").html(data);
        //alert("Load was performed.");
    });

    $.get("http://159.69.113.252/~kapluspl/tmp/countrylist.php", function (data) {
        $("#divcountry").html(data);
    });
    */

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

function TakeCountry()
{
    //$("#divcountry").empty();
    $.get("http://159.69.113.252/~kapluspl/tmp/countrylist.php", function (data) {
        $("#divcountry").html(data);
        alert('Load was performed.');
    });

}

function TakeCity(codecountry) {
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/citieslist.php',
        data: { "country" : codecountry },              // $('#formA').serialize(),
        type: "POST",
        success: function (data) {            
            $("#divcity").html(data);            
        },
        fail: function (data) {
            alert('Err 6. Internet connection problem');
        }
        
    });   
}