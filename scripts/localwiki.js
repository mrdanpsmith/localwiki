(function($) {
	var main = $('#main');
	function esc(str) {
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	function regex(str) {
		var expr = esc(config.expression.marker + str);
		var flags = config.expression.ignorecase ? 'gi': 'g';
		return new RegExp(expr,flags);
	}
	function merge(data,context) {
		var merged = data;
		if (context) {
			$.each(context,function(key,value) {
				var expression = config.expression.marker + key;
				merged = merged.replace(regex(key),value);
			});
		}
		return merged;
	}
	function html(markdown) {
		return marked(markdown);
	}
	function loadPage(filename,context) {
		$.ajax(filename,{
			dataType: 'text'
		}).done(function(data) {
			main.html(html(merge(data,context)));
		}).fail(function() {
			loadPage(config.page.error,{filename:filename});
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
	if (location.hash) {
		loadFromHash();
	} else {
		loadPage(config.page.home);
	}
})(jQuery);
