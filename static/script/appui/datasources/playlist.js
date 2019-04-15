define('iptv/appui/datasources/playlist', ['antie/class'], function(Class) {
	return Class.extend({
		loadData: function(callbacks, storage) {
			var data = [];
			var playlists = storage.getItem('playlists');
			if (playlists) {
				data = JSON.parse(playlists);
			}
			callbacks.onSuccess(data);
		}
	});
});
