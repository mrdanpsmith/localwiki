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
		event.preventDefault();
		event.stopImmediatePropagation();
		$.hash($(this).attr('href'));
	});
	$.hash(location.hash ? location.hash : 'README.md');
})(jQuery);
