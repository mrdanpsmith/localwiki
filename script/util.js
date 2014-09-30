localwiki.util = (function() {
	var pathSeparator = '/';
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
	function stringHasEnding(str,suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	return {
		joinPaths: joinPaths,
		esc: esc
	};
})();
