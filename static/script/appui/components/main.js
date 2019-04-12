define('iptv/appui/components/main', [
	'antie/widgets/component',
	'antie/widgets/button',
	'antie/widgets/label',
	'antie/storageprovider',
	'iptv/appui/widgets/keyboard',
	'iptv/appui/helpers/translate'
], function(Component, Button, Label, StorageProvider, WidgetKeyboard, HelperTranslate) {
	// All components extend Component
	return Component.extend({
		init: function init() {
			init.base.call(this, 'maincomponent');

			// Get a reference to the current application and device objects
			this._application = this.getCurrentApplication();
			this._device = this._application.getDevice();
			this._storage = this._device.getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, 'iptv');

			// Initialize tranlator
			this._translator = null;
			this._initTranslator();

			// Initialize widgets
			this._keyboard = null;
			this._initWidgets();

			// Initialize event listeners
			this._initEventListeners();

			// // Add label to the component
			// var helloWorldLabel = new Label('helloWorldLabel', t.translate('Hello World'));
			// self.appendChildWidget(helloWorldLabel);

			// // Add button to the component
			// var testButton = new Button();
			// testButton.appendChildWidget(new Label(t.translate('Select me!')));
			// testButton.addEventListener('select', function() {
			// 	alert('I am selected!');
			// });
			// self.appendChildWidget(testButton);
		},

		_initTranslator: function() {
			var locale = this._storage.getItem('locale') || 'en';
			this._translator = new HelperTranslate(locale);
		},

		_initWidgets: function() {
			this._addKeyboardWidget();
		},

		_initEventListeners: function() {
			var self = this;

			this.addEventListener('beforeshow', function() {
				var device = self._device;
				var keyboard = self._keyboard;

				// Hide Keyboard
				device.hideElement({
					el: keyboard.outputElement,
					skipAnim: true
				});
			});

			// calls Application.ready() the first time the component is shown
			// the callback removes itself once it's fired to avoid multiple calls.
			this.addEventListener('aftershow', function appReady() {
				console.log('aftershow', 'maincomponent');
				self.getCurrentApplication().ready();
				self.removeEventListener('aftershow', appReady);
			});
		},

		_addKeyboardWidget: function() {
			var keyboard = new WidgetKeyboard('ipTvKeyboardContainer');
			this._keyboard = keyboard;
			this.appendChildWidget(keyboard);
		}
	});
});
