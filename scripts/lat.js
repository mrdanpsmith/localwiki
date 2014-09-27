(function($) {
	$.fn.lat = function(settings) {
		var config = $.extend({},$.fn.lat.defaults,settings);
		if (location.protocol === 'file:') {
			var scripts = document.getElementsByTagName("script"),
				src = scripts[scripts.length-1].src;
			$.ajax(src,{dataType: 'text'}).done(config.success).fail(config.fail);
		} else {
			config.success.call(settings);
		}
		return this;
	};
	$.fn.lat.defaults = {
		success: $.noop,
		fail: $.noop
	};
})(jQuery);
