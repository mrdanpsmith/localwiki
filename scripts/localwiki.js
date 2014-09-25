(function($) {
	function loadFromHash() {
		var filename = location.hash.replace(/#(.*)/,'$1.txt');
		$.ajax(filename,{
			dataType: 'text'
		}).done(function(data) {
			$('#content').html(markdown.toHTML(data));
		});
	}
	$(window).on('hashchange',function() {
		loadFromHash();
	});
	$.hash('test');
})(jQuery);
