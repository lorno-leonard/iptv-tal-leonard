define('iptv/appui/datasources/playlist', ['antie/class'], function(Class) {
	function getData(storage) {
		return new Promise(function(resolve) {
			var data = [];
			var playlists = storage.getItem('playlists');
			if (playlists) {
				data = JSON.parse(playlists);
			}
			resolve(data);
		});
	}
	return Class.extend({
		loadData: function(callbacks, storage) {
			getData(storage).then(callbacks.onSuccess);
		}
	});
});
