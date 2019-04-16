define('iptv/appui/widgets/keyboard-container', ['antie/widgets/component', 'iptv/appui/widgets/keyboard', 'antie/widgets/label'], function(
	Component,
	WidgetKeyboard,
	Label
) {
	var ipTvKeyboard = Component.extend({
		init: function init(id) {
			init.base.call(this, id);

			this.addClass('iptv-keyboard-container');

			this._keyboardTextbox = null;
			this._keyboard = null;

			this._addKeyboardTextbox();
			this._addKeyboard();
		},

		getText: function getText() {
			return this._keyboard.getText();
		},

		setText: function setText(text) {
			this._keyboard.setText(text);
		},

		clear: function clear() {
			this._keyboard.setText('');
			this._keyboardTextbox.setText('');
		},

		_addKeyboardTextbox: function() {
			var textboxContainer = new Component('iptvKeyboardTextboxContainer');
			textboxContainer.addClass('iptv-keyboard-textbox-container');

			var textbox = new Label('iptvKeyboardTextbox', '');
			textbox.addClass('iptv-keyboard-textbox');
			this._keyboardTextbox = textbox;

			textboxContainer.appendChildWidget(textbox);
			this.appendChildWidget(textboxContainer);
		},

		_addKeyboard: function() {
			var self = this;
			var cols = 15;
			var rows = 3;
			var keys = [' qwertyuiop789 ', '-asdfghjkl/456-', '`zxcvbnm.:0123`'].join('');
			var keyboard = new WidgetKeyboard('iptvKeyboard', cols, rows, keys);

			keyboard.addClass('iptv-keyboard');
			keyboard.setActiveChildKey('q');
			keyboard.setCapitalisation(1);
			keyboard.addEventListener('textchange', function() {
				var currentText = self._keyboard.getText();
				self._keyboardTextbox.setText(currentText);
			});

			this.appendChildWidget(keyboard);
			this._keyboard = keyboard;
		}
	});

	return ipTvKeyboard;
});
