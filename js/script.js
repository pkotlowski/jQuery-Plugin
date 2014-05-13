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
        $("#loading_icon").removeAttr("hidden");
        var a = $(this).validatePostalCode({});
        //console.log(a)
        if (a.valid && a.cityName !== 'undefined') {
            $("#postalCodeTextBox").parent().removeClass("has-error");
            $("#sbmBtn").removeAttr("disabled");
            $("#cityTextBox").val(a.cityName);
            $("#loading_icon").attr("hidden", "hidden");
        }
        else {
            $("#postalCodeTextBox").parent().addClass("has-error");
            $("#sbmBtn").attr("disabled", "disabled");
        }
    });
    $("#passwordTextBox").keyup(function() {
        var a = $(this).validatePassword({});
        console.log(a);
        if (a.strenght === "hard") {
            $(".progress-bar").removeClass("progress-bar-warning");
            $(".progress-bar").removeClass("progress-bar-info");
            $('.progress-bar').css({width: "100%"});
            $(".progress-bar").addClass("progress-bar-danger");
            $("#sbmBtn").removeAttr("disabled");
            $("#passwordTextBox").parent().removeClass("has-error");

        }
        if (a.strenght === "medium") {
            $(".progress-bar").removeClass("progress-bar-danger");
            $(".progress-bar").removeClass("progress-bar-info");
            $('.progress-bar').css({width: "70%"});
            $(".progress-bar").addClass("progress-bar-warning");
            $("#sbmBtn").removeAttr("disabled");
            $("#passwordTextBox").parent().removeClass("has-error");
        }
        if (a.strenght === "soft") {
            $(".progress-bar").removeClass("progress-bar-warning");
            $(".progress-bar").removeClass("progress-bar-danger");
            $('.progress-bar').css({width: "30%"});
            $(".progress-bar").addClass("progress-bar-info");
            $("#sbmBtn").removeAttr("disabled");
            $("#passwordTextBox").parent().removeClass("has-error");
        }
        if (a.strenght === "error") {
            $(".progress-bar").removeClass("progress-bar-warning");
            $(".progress-bar").removeClass("progress-bar-danger");
            $(".progress-bar").removeClass("progress-bar-info");
            $('.progress-bar').css({width: "0%"});
            $("#sbmBtn").attr("disabled", "disabled");
        }
    });
    $("#sbmBtn").click(function(){
        var a = $("input").validateForm();
        console.log(a);
    });

});