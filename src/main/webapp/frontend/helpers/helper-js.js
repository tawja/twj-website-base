(function () {
    module.exports.register = function (Handlebars, options) {

        var path = require('path');

        var getExt = function (str) {
            var extname = path.extname(str);
            if (extname) {
                str = extname;
            }
            if (str[0] === ".") {
                str = str.substring(1);
            }
            return str;
        };
        Handlebars.registerHelper("helper-js", function (context) {
            if (!Array.isArray(context)) {
                context = [context];
            }
            return new Handlebars.SafeString(context.map(function (item) {
                var ext = getExt(item);
                var js = '<script src="' + options.assets + '/' + item + '"></script>';
                var coffee = '<script type="text/coffeescript" src="' + options.assets + '/js/' + item + '"></script>';
                switch (ext) {
                    case "js":
                        return js;
                    case "coffee":
                        return coffee;
                    default:
                        return js;
                }
            }).join("\n"));
        });

    };
}).call(this);
