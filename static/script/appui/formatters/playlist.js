define('iptv/appui/formatters/playlist', ['antie/formatter', 'antie/widgets/label', 'antie/widgets/button'], function(Formatter, Label, Button) {
	return Formatter.extend({
		init: function init(translator) {
			this._translator = translator;
		},
		format: function(iterator) {
			var button, item;
			item = iterator.next();
			button = new Button('playlist' + iterator._currentIndex);
			button.appendChildWidget(new Label(item));
			return button;
		}
	});
});
