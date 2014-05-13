(function ($) {
    "use strict";

    var validateText = function (value, minLength, maxLength, regExpression) {
        var re = new RegExp(regExpression);
        if (value.length >= minLength && value.length <= maxLength && re.test(value)) {
            return true;
        }
        return false;

    };
    $.fn.validateTextBox = function (options) {
        var settings = $.extend({
            minimumLength: 0,
            maximumLength: 99,
            regularExpression: "[a-zA-Ząśćżźłó]"
        }, options);
        if (validateText(this.val(), settings.minimumLength, settings.maximumLength, settings.regularExpression)) {
            return true;
        }
        return false;

    };
    var validateMail = function (value, minLength, maxLength, regExpression) {
        var re = new RegExp(regExpression);
        if (value.length >= minLength && value.length <= maxLength && re.test(value)) {
            return true;
        }
        return false;
    };
    $.fn.validateEmail = function (options) {
        var settings = $.extend({
            minimumLength: 0,
            maximumLength: 99,
            regularExpression: "^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{1,})*\.([a-zA-Z]{2,}){1}$"
        }, options);

        if (validateMail(this.val(), settings.minimumLength, settings.maximumLength, settings.regularExpression)) {
            return true;
        }
        return false;
    };
    var getCityFromPostalCode = function (code) {
        var city, dataa;
        $.ajax({
            type: "GET",
            url: "/jQuery/Public/kody.csv",
            dataType: "text",
            async: false,
            success: function (data) {
                dataa = $.csv.toObjects(data, {separator: ';'});
                for (var i = 0; i < dataa.length; i++) {
                    if (dataa[i].KOD_POCZTOWY === code) {
                        city = dataa[i].MIEJSCOWOŚĆ;
                    }
                }
            }
        });
        return city;
    };
    var validatePostalCode = function (value, regExpression) {
        var re = new RegExp(regExpression);
        if (re.test(value)) {
            return true;
        }
        return false;
    };
    $.fn.validatePostalCode = function (options) {
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

    var validatePasswordStrength = function (password, softPassword, mediumPassword, hardPassword, minLength, maxLength) {
        var soft = new RegExp(softPassword);
        var medium = new RegExp(mediumPassword);
        var hard = new RegExp(hardPassword);
        if (hard.test(password) && password.length >= minLength && password.length <= maxLength) {
            return({strenght: "hard"});
        }
        else {
            if (medium.test(password) && password.length >= minLength && password.length <= maxLength) {
                return({strenght: "medium"});
            }
            else
            if (soft.test(password) && password.length >= minLength && password.length <= maxLength) {
                return({strenght: "soft"});
            }
            else {
                return({strenght: "error"});
            }
        }
    };

    $.fn.validatePassword = function (options) {
        var settings = $.extend({
            softPasswordRegularExpression: "[A-Za-z]",
            mediumPasswordRegularExpression: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]",
            hardPasswordRegularExpression: "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@]))",
            minLength: 6,
            maxLength: 20
        }, options);
        var strenght = validatePasswordStrength(this.val(), settings.softPasswordRegularExpression, settings.mediumPasswordRegularExpression, settings.hardPasswordRegularExpression, settings.minLength, settings.maxLength);
        return strenght;
    };

    var calculatePesel = function (pesel) {
        var tmp = 1 * pesel[0] + 3 * pesel[1] + 7 * pesel[2] + 9 * pesel[3] + 1 * pesel[4] +
                +3 * pesel[5] + 7 * pesel[6] + 9 * pesel[7] + 1 * pesel[8] + 3 * pesel[9];
        tmp %= 10;
        tmp = 10 - tmp;
        tmp %= 10;
        if (tmp == pesel[10])
            return true;

        return false;
    };

    $.fn.validatePesel = function () {
        var pesel = this.val();
        var matcher = new RegExp("[0-9]{11,11}");
        var sex = "";
        if (matcher.test(pesel)) {
            if (calculatePesel(pesel)) {
                if (pesel[9] % 2 == 0)
                    sex = "K";
                else
                    sex = "M";
                return({sex: sex, valid: true});
            }
            else {
                return({sex: sex, valid: false});
            }
        }
        else {
            return({sex: sex, valid: false});
        }
    };

    $.fn.validateForm = function (options) {
        var settings = $.extend({
            errorClass: ""
        }, options);
        this.each(function () {
            if ($(this).val().length < 1) {
                $(this).parent().addClass(settings.errorClass);
            }
            else {
                $(this).parent().removeClass(settings.errorClass);
            }
        });
        return this;
    };


})(jQuery);

