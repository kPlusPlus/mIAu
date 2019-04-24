// for communicate with geodata





$(function () {

    var rootUrl = "https://geodata.solutions/restapi?limit=10";
    var myHeaders = new Headers();
    myHeaders.append("X-My-Custom-Header", "some value");

    $.getJSON(rootUrl, function (data) {
        alert(data);
        var items = [];
        $.each(data, function (key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");
        });

        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });



});