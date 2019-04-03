/*
$(document).on('pagecreate', '#app', function () {
    alert('Network error has occurred please try again!');
});
*/

$(document).on("tap", "#test", function () {
    TakeAll();
});

$(document).on("change", "#selcountry", function () {
    //alert("RADIM");
    var codecountry;
    codecountry = $("#selcountry").select().val();
    TakeCity(codecountry);
});


function TakeAll() {
    $.get("http://159.69.113.252/~kapluspl/tmp/citieslist.php", function (data) {
        $("#divcity").html(data);
        //alert("Load was performed.");
    });

    $.get("http://159.69.113.252/~kapluspl/tmp/countrylist.php", function (data) {
        $("#divcountry").html(data);
    });   
}

function TakeCity(codecountry) {
    $.ajax({
        url: 'http://159.69.113.252/~kapluspl/tmp/citieslist.php',
        data: { "country" : codecountry },              // $('#formA').serialize(),
        type: "POST",
        success: function (data) {
            //$('.result').html(data);
            //alert('Load was performed.');
        }
    });   
}