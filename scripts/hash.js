(function($) {
	$.hash = function(value) {
		if (history.pushState) {
			history.pushState(null,null,'#'+value);
		} else {
			location.hash = '#'+value;
		}
		$(document).trigger('hashchange');
	};
})(jQuery);
