(function($) {
	var localAjaxError = $('#local-ajax-error');
	$.fn.lat({
		success: function() {
			localAjaxError.remove();
			localwiki(config);
		},
		fail: function() {
			localAjaxError.fadeIn();
		}
	});
})(jQuery);
