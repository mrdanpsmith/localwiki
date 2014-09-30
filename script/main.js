(function($) {
	var localAjaxError = $('#local-ajax-error');
	$.fn.lat({
		success: function() {
			localAjaxError.remove();
			if (localwiki.customConfig != undefined) {
				localwiki(localwiki.customConfig);
			} else {
				localwiki();
			}
		},
		fail: function() {
			localAjaxError.fadeIn();
		}
	});
})(jQuery);
