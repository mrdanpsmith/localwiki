(function($) {
	var main = $('#main');
	function loadFromHash() {
		var filename = location.hash.replace(/#(.*)/,'$1.txt');
		$.ajax(filename,{
			dataType: 'text'
		}).done(function(data) {
			$('title').text('localwiki: ' + filename);
			main.html(markdown.toHTML(data));
		});
	}
	$(window).on('hashchange',function() {
		loadFromHash();
	});
	main.on('click','a',function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$.hash($(this).attr('href'));
	});
	$.hash('home');
})(jQuery);
