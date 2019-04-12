define('iptv/appui/formatters/playlist', ['antie/formatter', 'antie/widgets/label', 'antie/widgets/button'], function(Formatter, Label, Button) {
	return Formatter.extend({
		init: function init(translator) {
			this._translator = translator;
		},
		format: function(iterator) {
			// var t = this._translator;
			// console.log(iterator);
			var button, item;
			item = iterator.next();
			button = new Button('fruit' + item.id);
			button.appendChildWidget(new Label(item.title));
			return button;
		}
	});
});
