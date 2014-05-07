(function($) {
    "use strict";

    var validateText = function(value, minLength, maxLength, regExpression) {
        var re= new RegExp(regExpression)
        console.log(re)
        console.log(re.test(value))
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
            return this.parent().removeClass("has-error");
        }
        else {
            return this.parent().addClass("has-error");
        }
    };

})(jQuery);