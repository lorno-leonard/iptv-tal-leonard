define('iptv/appui/datasources/playlist', ['antie/class'], function(Class) {
	return Class.extend({
		loadData: function(callbacks, storage) {
			// var data = [
			// 	{
			// 		type: 'add'
			// 	}
			// ];
			// console.log(storage);
			callbacks.onSuccess([
				{
					id: '1',
					title: 'Apple'
				},
				{
					id: '2',
					title: 'Banana'
				},
				{
					id: '3',
					title: 'Grapes'
				},
				{
					id: '4',
					title: 'Orange'
				},
				{
					id: '5',
					title: 'Peach'
				},
				{
					id: '6',
					title: 'Pear'
				}
			]);
		}
	});
});
