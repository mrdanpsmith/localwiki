(function($) {
	localwiki = function(config) {
		var main = $('#main');
		if (location.hash) {
			loadFromHash();
		} else {
			loadPage(config.page.home);
		}
		attachHandlers();

		function loadFromHash() {
			loadPage(location.hash.replace(/#(.*)/,'$1'));
		}

		function loadPage(filename,context) {
			$.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				main.html(html(merge(data,context)));
			}).fail(function() {
				loadPage(config.page.error,{filename:filename});
			}).always(function() {
				$('title').text(config.title.prefix + filename);
			});
		}

		function attachHandlers() {
			$(window).on('hashchange',function() {
				loadFromHash();
			});
			main.on('click','a',function(event) {
				var href = $(this).attr('href');
				if (href.indexOf('http') != 0) {
					$.hash(href);
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});
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

		function regex(str) {
			var expr = esc(config.expression.marker + str);
			var flags = config.expression.ignorecase ? 'gi': 'g';
			return new RegExp(expr,flags);
		}

		function esc(str) {
			return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		function html(markdown) {
			return marked(markdown);
		}
	};
})(jQuery);
