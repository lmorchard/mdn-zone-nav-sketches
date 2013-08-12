$(document).ready(function () {

    var zone_urls = {
        'apps': '../../zones/apps/index.html',
        'games': '../../zones/games/index.html',
        'persona': '../../zones/persona/index.html',
        'css': '../../reference/css/index.html',
        'js': '../../reference/js/index.html'
    };

    var c_params = {};
    if (location.hash) {
        var parts = location.hash.substr(1).split('&');
        _.each(parts, function (part) {
            var sp = part.split('=');
            c_params[sp[0]] = sp[1];
        })
    }

    var finalizeNav = function () {
        $('nav.subbranding a, nav.side a').each(function () {
            var link = $(this);
            var href = link.attr('href');
            href += '#zone=' + selected_zone;
            link.attr('href', href);
        });
        $('body').addClass('reveal-nav');
    };

    var native_zone = '';
    var body_class = $('body').attr('class');
    if (body_class) {
        _.each(body_class.split(' '), function (cls) {
            if (0 === cls.indexOf('zone-')) {
                var parts = cls.split('-');
                parts.shift();
                native_zone = parts.join('-');
            }
        });
    }

    var selected_zone = native_zone;

    if (c_params.zone && c_params.zone != native_zone) {
        
        selected_zone = c_params.zone;

        $('body')
            .removeClass('zone-' + native_zone)
            .addClass('zone-' + c_params.zone);

        $.get(zone_urls[selected_zone], function (data, st, xhr) {
            
            console.log("REPLACING NAV FOR ZONE " + selected_zone);
            var zone_doc = $(data);

            $('nav.top').replaceWith(zone_doc.find('nav.top'));
            $('nav.subbranding').replaceWith(zone_doc.find('nav.subbranding'));
            $('nav.side').replaceWith(zone_doc.find('nav.side'));

            finalizeNav();

        }, 'html');
    
    } else {

        finalizeNav();

    }

});
