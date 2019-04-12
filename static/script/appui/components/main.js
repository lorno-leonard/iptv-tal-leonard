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
			this._header = null;
			this._keyboard = null;
			this._initWidgets();

			// Initialize event listeners
			this._initEventListeners();
		},

		_initTranslator: function() {
			var locale = this._storage.getItem('locale') || 'en';
			this._translator = new HelperTranslate(locale, this._storage);
			// this._translator.setLocale('en');
		},

		_initWidgets: function() {
			this._addHeader();
			this._addKeyboard();
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

			this.addEventListener('aftershow', function() {
				// self.setActiveChildWidget(self._keyboard);
			});

			// calls Application.ready() the first time the component is shown
			// the callback removes itself once it's fired to avoid multiple calls.
			this.addEventListener('aftershow', function appReady() {
				self.getCurrentApplication().ready();
				self.removeEventListener('aftershow', appReady);
			});
		},

		/* ADD WIDGETS */
		_addHeader: function() {
			var t = this._translator;

			// Header Label
			var headerLabel = new Label('iptvMainCmpHeaderLabel');
			headerLabel.setText(t.__('MAIN_CMP_HEADER_LABEL'));

			// Header Language button toggler
			var headerLangButtonLabel = new Label('iptvMainCmpHeaderLangButtonLabel');
			headerLangButtonLabel.setText(t.__('MAIN_CMP_HEADER_LANG_BUTTON'));
			var headerLangButton = new Button('iptvMainCmpHeaderLangButton');
			headerLangButton.appendChildWidget(headerLangButtonLabel);

			// Header
			var header = new Component('iptvMainCmpHeader');
			header.addClass('header');
			header.addClass('iptv-main-cmp-header');
			header.appendChildWidget(headerLabel);
			header.appendChildWidget(headerLangButton);
			this._header = header;
			this.appendChildWidget(header);
		},

		_addKeyboard: function() {
			var keyboard = new WidgetKeyboard('ipTvKeyboardContainer');
			this._keyboard = keyboard;
			this.appendChildWidget(keyboard);
		}
	});
});
