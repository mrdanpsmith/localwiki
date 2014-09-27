(function($) {
	var error = $('#local-ajax-error');
	$.fn.lat({
		success: function() {
			error.remove();
			localwiki(config);
		},
		fail: function() {
			error.fadeIn();
		}
	});
})(jQuery);
