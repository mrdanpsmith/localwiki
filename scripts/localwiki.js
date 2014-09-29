(function($) {
	localwiki = function(config) {
		var main = $('#main');
		var title = $('title');
		var pathSeparator = '/';
		attachHandlers();
		if (location.hash) {
			loadFromHash();
		} else {
			$.hash(config.page.home);
		}

		function loadFromHash() {
			loadPage(hashAsPageName());
		}

		function loadErrorPage(pageName,context) {
			var filename = joinPaths(config.path.errorDir,pageName);
			var dynamicProps = {
				pageName: pageName,
				filename: filename
			};
			context = context ? $.extend({},dynamicProps,context) : dynamicProps;
			$.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				updatePage(data,context);
			}).fail(function() {
				$('#error-loading-error-page').fadeIn();
			});
		}

		function loadPage(pageName,context) {
			var filename = joinPaths(config.path.baseDir,pageName);
			var dynamicProps = {
				pageName: pageName,
				filename: filename
			};
			context = context ? $.extend({},dynamicProps,context) : dynamicProps;
			$.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				updatePage(data,context);
			}).fail(function() {
				loadErrorPage(config.page.error,context);
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
				var link = $(this);
				var href = link.attr('href');
				if (href.indexOf('http') !== 0 && !link.hasClass(config.parser.doNotHandleClass)) {
					$.hash(href);
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});
		}

		function hashAsPageName() {
			return location.hash.replace(/#(.*)/,'$1');
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
			var flags = config.expression.ignoreCase ? 'gi': 'g';
			return new RegExp(expr,flags);
		}

		function joinPaths() {
			var paths = arguments;
			var joined = '';
			for (var i = 0; i < paths.length-1; i++) {
				joined += stringHasEnding(paths[i],pathSeparator) ? paths[i] : paths[i] + pathSeparator;
			}
			joined += paths[paths.length-1];
			return joined;
		}

		function esc(str) {
			return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		function html(markdown) {
			return marked(markdown);
		}

		function stringHasEnding(str,suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
	};
})(jQuery);
