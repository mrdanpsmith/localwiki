(function($) {
	var errorFilename = 'ERROR.md';
	var main = $('#main');
	function html(data) {
		return marked(data);
	}
	function loadPage(filename,error) {
		$.ajax(filename,{
			dataType: 'text'
		}).done(function(data) {
			main.html(error ? html(data.replace(/\$error_filename/g,error.filename)) : html(data));
		}).fail(function() {
			if (!error) {
				loadPage(errorFilename,{filename:filename});
			}
		}).always(function() {
			$('title').text('localwiki: ' + filename);
		});
	}
	function loadFromHash() {
		var filename = location.hash.replace(/#(.*)/,'$1');
		loadPage(filename);
	}
	$(window).on('hashchange',function() {
		loadFromHash();
	});
	main.on('click','a',function(event) {
		var href = $(this).attr('href');
		if (href.indexOf('http') != 0) {
			$.hash($(this).attr('href'));
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	});
	$.hash(location.hash ? location.hash : 'README.md');
})(jQuery);
