(function($) {
	var errorFilename = 'ERROR.md';
	var main = $('#main');
	function loadFile(filename,error) {
		$.ajax(filename,{
			dataType: 'text'
		}).done(function(data) {
			main.html(error ? markdown.toHTML(data).replace(/\$error_filename/g,error.filename) : markdown.toHTML(data));
		}).fail(function() {
			if (!error) {
				loadFile(errorFilename,{filename:filename});
			}
		}).always(function() {
			$('title').text('localwiki: ' + filename);
		});
	}
	function loadFromHash() {
		var filename = location.hash.replace(/#(.*)/,'$1');
		loadFile(filename);
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
