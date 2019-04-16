define('iptv/appui/helpers/general', [], function() {
	return {
		generateId: function() {
			var array = new Uint32Array(8);
			window.crypto.getRandomValues(array);
			var str = '';
			for (var i = 0; i < array.length; i++) {
				str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);
			}
			return str;
		}
	};
});
