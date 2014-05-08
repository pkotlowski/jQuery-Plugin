$(function() {

    $("#nameTextBox").keyup(function() {
        var a = $(this).validateTextBox({minimumLength: 5, maximumLength: 10});
        if (a) {
            $("#nameTextBox").parent().removeClass("has-error");
            $("#sbmBtn").removeAttr("disabled");
        }
        else {
            $("#nameTextBox").parent().addClass("has-error");
            $("#sbmBtn").attr("disabled", "disabled");
        }
    });
    $("#emailTextBox").keyup(function() {
        var a = $(this).validateEmail({minimumLength: 10});
        if (a) {
            $("#emailTextBox").parent().removeClass("has-error");
            $("#sbmBtn").removeAttr("disabled");
        }
        else {
            $("#emailTextBox").parent().addClass("has-error");
            $("#sbmBtn").attr("disabled", "disabled");
        }
    });

    $("#postalCodeTextBox").keyup(function() {
        var a = $(this).validatePostalCode({});
        //console.log(a)
        if (a.valid && a.cityName !== 'undefined') {
            $("#postalCodeTextBox").parent().removeClass("has-error");
            $("#sbmBtn").removeAttr("disabled");
            console.log(a.cityName)
            $("#cityTextBox").val(a.cityName);

        }
        else {
            $("#postalCodeTextBox").parent().addClass("has-error");
            $("#sbmBtn").attr("disabled", "disabled");
        }
    });

});