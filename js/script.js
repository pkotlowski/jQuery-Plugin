$(function() {

    $("#nameTextBox").keyup(function() {

        $(this).validateTextBox({minimumLength:5, maximumLength:10});
    });
});
