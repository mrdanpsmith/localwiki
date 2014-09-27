(function($) {
	localwiki = function(config) {
		var main = $('#main');
		var title = $('title');
		attachHandlers();
		if (location.hash) {
			loadFromHash();
		} else {
			$.hash(config.page.home);
		}

		function loadFromHash() {
			loadPage(location.hash.replace(/#(.*)/,'$1'));
		}

		function loadErrorPage(filename,context) {
			$.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				updatePage(data,context);
			}).fail(function() {
				$('#error-loading-error-page').fadeIn();
			});
		}

		function loadPage(filename) {
			$.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				updatePage(data,{filename: filename});
			}).fail(function() {
				loadErrorPage(config.page.error,{filename:filename});
			});
		}

		function updatePage(data,context) {
			main.hide();
			main.html(html(merge(data,context)));
			title.text(merge(config.title,context));
			main.fadeIn();
		}

		function attachHandlers() {
			$(window).on('hashchange',function() {
				loadFromHash();
			});
			main.on('click','a',function(event) {
				var href = $(this).attr('href');
				if (href.indexOf('http') !== 0) {
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
