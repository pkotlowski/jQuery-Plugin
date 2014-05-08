(function($) {
    "use strict";

    var validateText = function(value, minLength, maxLength, regExpression) {
        var re = new RegExp(regExpression);

        console.log(value.length >= minLength && value.length <= maxLength && re.test(value));
        if (value.length >= minLength && value.length <= maxLength && re.test(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    $.fn.validateTextBox = function(options) {
        var settings = $.extend({
            // These are the defaults.
            minimumLength: 0,
            maximumLength: 99,
            regularExpression: "[a-zA-Z]"
        }, options);
        //console.log(validateText(this.val(), settings.minimumLength, settings.maximumLength));
        if (validateText(this.val(), settings.minimumLength, settings.maximumLength, settings.regularExpression)) {
            return true;
        }
        else {
            return false;
        }
    };
    var validateMail = function(value, minLength, maxLength, regExpression) {
        var re = new RegExp(regExpression);
        if (value.length >= minLength && value.length <= maxLength && re.test(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    $.fn.validateEmail = function(options) {
        var settings = $.extend({
            minimumLength: 0,
            maximumLength: 99,
            regularExpression: "^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{1,})*\.([a-zA-Z]{2,}){1}$"
        }, options);

        if (validateMail(this.val(), settings.minimumLength, settings.maximumLength, settings.regularExpression)) {
            return true;
        }
        else {
            return false;
        }
    };
    var getCityFromPostalCode = function(code) {
        var city;
        $.ajax({
            type: "GET",
            url: "/jQuery/Public/kody.csv",
            dataType: "text",
            async: false,
            success: function(data) {
                var dataa = $.csv.toObjects(data, {separator: ';'});
                for (var i = 0; i < dataa.length; i++) {

                    if (dataa[i].KOD_POCZTOWY === code) {
                        //console.log(dataa[i].MIEJSCOWOŚĆ)
                        city = dataa[i].MIEJSCOWOŚĆ;
                        //callback();

                        //break;
                    }
                }
            }

        });
        return city;
    };
    var validatePostalCode = function(value, regExpression) {
        var re = new RegExp(regExpression);
        if (re.test(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    $.fn.validatePostalCode = function(options) {
        var settings = $.extend({
            regularExpression: "[0-9][0-9]-[0-9][0-9][0-9]"
        }, options);
        if (validatePostalCode(this.val(), settings.regularExpression)) {
            var cityName = getCityFromPostalCode(this.val());
            return ({valid: true, cityName: cityName});


        }
        else {
            return ({valid: false, cityName: cityName});
        }
    };

    var validatePasswordStrength = function(password, softPassword, mediumPassword, hardPassword) {
        var soft = new RegExp(softPassword);
        var medium = new RegExp(mediumPassword);
        var hard = new RegExp(hardPassword);
console.log("hard "+hard.test(password));
        if (hard.test(password)) {
            return({strenght: "hard"});
            console.log("hard");
        }
        else {
            console.log("med "+medium.test(password));
            if (medium.test(password)) {
                return({strenght: "medium"});
                console.log("medium");
            }
            else
                console.log("soft "+soft.test(password));
            if (soft.test(password)) {
                return({strenght: "soft"});
                console.log("soft");
            }
            else {
                return({strenght: "error"});
                console.log("err");
            }
        }
    };

    $.fn.validatePassword = function(options) {
        var settings = $.extend({
            softPasswordRegularExpression: "[A-Za-z]",
            mediumPasswordRegularExpression: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]",
            hardPasswordRegularExpression: "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@]))"
            //"((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%,.\[\]\^!]).{6,20})"
        }, options);
//        
        var strenght = validatePasswordStrength(this.val(), settings.softPasswordRegularExpression, settings.mediumPasswordRegularExpression, settings.hardPasswordRegularExpression);
        return strenght;
    };

})(jQuery);