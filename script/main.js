(function($) {
	var localAjaxError = $('#local-ajax-error');
	$.fn.lat({
		success: function() {
			localAjaxError.remove();
			$.getJSON($('[data-config-url]').attr('data-config-url'),function(config) {
				localwiki(config);
			});
		},
		fail: function() {
			localAjaxError.fadeIn();
		}
	});
})(jQuery);