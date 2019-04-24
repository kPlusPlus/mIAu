// for communicate with geodata





$(function () {

    //var rootUrl = "https://geodata.solutions/restapi?limit=10";
    var rootUrl = "//geodata.solutions/api/api.php?type=getCountries";    

    $.getJSON(rootUrl, function (data) {
        //console.log(data['result']);
        
        var country = "<select onchange='getState();' class='form-control count'>";
        $.each(data['result'], function (key, value) {
            $.each(value, function (keys, vals) {
                country += "<option value='" + keys + "'>" + vals + "</option>";
            });
        });
        country += "</select>";
        //$('.ccam').html(country);
        //$('.ccam').html("567");
    });



});