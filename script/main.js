(function($) {
	var localAjaxError = $('#local-ajax-error');
	$.fn.lat({
		success: function() {
			localAjaxError.remove();
			if (localwikiConfig != undefined) {
				localwiki(localwikiConfig);
			} else {
				localwiki();
			}
		},
		fail: function() {
			localAjaxError.fadeIn();
		}
	});
})(jQuery);
