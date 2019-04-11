define('iptv/appui/widgets/keyboard', ['antie/widgets/componentcontainer', 'antie/widgets/keyboard', 'antie/widgets/label'], function(
	ComponentContainer,
	Keyboard,
	Label
) {
	var ipTvKeyboard = ComponentContainer.extend({
		init: function init(id) {
			init.base.call(this, id);

			this.addClass('iptv-keyboard-container');

			this._keyboardTextbox = null;
			this._keyboard = null;

			this._addKeyboardTextbox();
			this._addKeyboard();
		},
		_addKeyboardTextbox: function _addKeyboardTextbox() {
			var textboxContainer = new ComponentContainer('iptvKeyboardTextboxContainer');
			textboxContainer.addClass('iptv-keyboard-textbox-container');

			var textbox = new Label('iptvKeyboardTextbox', '');
			textbox.addClass('iptv-keyboard-textbox');
			this._keyboardTextbox = textbox;

			textboxContainer.appendChildWidget(textbox);
			this.appendChildWidget(textboxContainer);
		},
		_addKeyboard: function _addKeyboard() {
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
