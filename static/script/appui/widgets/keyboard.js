define('iptv/appui/widgets/keyboard', ['antie/widgets/component', 'antie/widgets/keyboard', 'antie/widgets/label'], function(
	Component,
	Keyboard,
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
			var keys = [' qwertyuiop789 ', '-asdfghjkl/456-', '_zxcvbnm.:0123_'].join('');
			var keyboard = new Keyboard('iptvKeyboard', cols, rows, keys);

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
