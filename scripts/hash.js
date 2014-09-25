(function($) {
	$.hash = function(value) {
		var hashValue = value.indexOf('#') == 0 ? value : '#' + value;
		if (history.pushState) {
			history.pushState(null,null,hashValue);
		} else {
			location.hash = hashValue;
		}
		$(document).trigger('hashchange');
	};
})(jQuery);
