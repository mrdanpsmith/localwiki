(function($) {
	localwiki = function(customConfig) {
		var config = customConfig ? $.extend(true,{},localwiki.defaults,customConfig) : localwiki.defaults;
		var util = localwiki.util;
		var main = $('#main');
		var title = $('title');
		attachHandlers();
		loadCurrentPage();

		function loadCurrentPage() {
			if (hashAsPageName() !== '') {
				loadPage(hashAsPageName());
			} else {
				loadPage(config.page.home);
			}
		}

		function loadPage(pageName) {
			var filename = util.joinPaths(config.path.baseDir,pageName);
			var context = {
				filename:filename,
				pageName:pageName
			};
			ajaxUpdate(context.filename,context).fail(function() {
				loadErrorPage(config.page.error,context);
			});
		}

		function loadErrorPage(pageName,context) {
			var filename = util.joinPaths(config.path.errorDir,pageName);
			ajaxUpdate(filename,context).fail(function() {
				$('#error-loading-error-page').fadeIn();
			});
		}

		function ajaxUpdate(filename,context) {
			return $.ajax(filename,{
				dataType: 'text'
			}).done(function(data) {
				updatePage(data,context);
				window.scrollTo(0,0);
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
				loadCurrentPage();
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
			return location.hash ? location.hash.replace(/#(.*)/,'$1').trim() : '';
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
			var expr = util.esc(config.expression.marker + str);
			var flags = config.expression.ignoreCase ? 'gi': 'g';
			return new RegExp(expr,flags);
		}

		function html(markdown) {
			return marked(markdown);
		}

	};

	localwiki.defaults = {
		path: {
			baseDir: '.',
			errorDir: 'error'
		},
		page: {
			home: 'README.md',
			error: 'error.md'
		},
		expression: {
			marker: '$',
			ignoreCase: false
		},
		parser: {
			doNotHandleClass: 'do-not-override'
		},
		title: 'localwiki: $pageName'
	};

})(jQuery);
