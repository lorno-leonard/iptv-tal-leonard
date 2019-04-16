define('iptv/appui/components/main', [
	'antie/widgets/component',
	'antie/widgets/button',
	'antie/widgets/label',
	'antie/widgets/verticallist',
	'antie/events/keyevent',
	'antie/storageprovider',
	'antie/datasource',
	'iptv/appui/widgets/keyboard-container',
	'iptv/appui/helpers/translate',
	'iptv/appui/datasources/playlist',
	'iptv/appui/formatters/playlist'
], function(
	Component,
	Button,
	Label,
	VerticalList,
	KeyEvent,
	StorageProvider,
	DataSource,
	WidgetKeyboardContainer,
	HelperTranslate,
	DataPlaylist,
	FormatterPlaylist
) {
	/* Main Component
	 * - Displays list of playlists from entered m3u url
	 * - Add playlist
	 * - Change display language
	 */
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
			this._playlist = null;
			this._initWidgets();

			this._focusedPlaylistChildWidgetId = null;

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
			this._addPlaylist();
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
				// self.setActiveChildWidget(self._playlist.getChildWidget('iptvMainCmpPlaylistAddButton'));
			});

			this.addEventListener('submit', function() {
				console.log('submit eventlistener');

				var device = self._device;
				var keyboard = self._keyboard;

				// Hide Keyboard
				device.hideElement({
					el: keyboard.outputElement,
					skipAnim: true
				});

				// Add text to playlist data
				var text = self._keyboard.getChildWidget('iptvKeyboard').getText();
				var playlists = self._storage.getItem('playlists');
				var playlistArr;
				if (!playlists) {
					playlistArr = [text];
				} else {
					playlistArr = JSON.parse(playlists);
					playlistArr.push(text);
				}
				self._storage.setItem('playlists', JSON.stringify(playlistArr));

				// Reload datasource
				var playlistMenu = self._playlist.getChildWidget('iptvMainCmpPlaylistMenu');
				var dataSource = new DataSource(null, new DataPlaylist(), 'loadData', self._storage);
				playlistMenu.setDataSource(dataSource);

				// Set playlist active widget
				self.setActiveChildWidget(self._playlist);
				self._playlist.setActiveChildWidget(playlistMenu);
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
			var self = this;
			var t = this._translator;

			// Header Label
			var headerLabel = new Label('iptvMainCmpHeaderLabel');
			headerLabel.setText(t.__('MAIN_CMP_HEADER_LABEL'));

			// Header Language button toggler
			var headerLangButtonLabel = new Label('iptvMainCmpHeaderLangButtonLabel');
			headerLangButtonLabel.setText(t.__('MAIN_CMP_HEADER_LANG_BUTTON'));
			var headerLangButton = new Button('iptvMainCmpHeaderLangButton');
			headerLangButton.appendChildWidget(headerLangButtonLabel);
			headerLangButton.addEventListener('keydown', function(evt) {
				if (evt.keyCode === KeyEvent.VK_DOWN) {
					self.setActiveChildWidget(self._playlist);
				}
			});

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
			var keyboard = new WidgetKeyboardContainer('ipTvMainCmpKeyboardContainer');
			this._keyboard = keyboard;
			this.appendChildWidget(keyboard);
		},

		_addPlaylist: function() {
			var self = this;
			var t = this._translator;

			var addPlaylistButton = new Button('iptvMainCmpPlaylistAddButton');
			addPlaylistButton.addClass('add-playlist-button');
			addPlaylistButton.appendChildWidget(new Label(null, t.__('MAIN_CMP_PLAYLIST_ADD_BUTTON')));
			addPlaylistButton.addEventListener('keydown', function(evt) {
				if (evt.keyCode === KeyEvent.VK_UP) {
					self.setActiveChildWidget(self._header);

					var langButton = self._header.getChildWidget('iptvMainCmpHeaderLangButton');
					self._header.setActiveChildWidget(langButton);
				} else if (evt.keyCode === KeyEvent.VK_DOWN) {
					var playlistMenu = self._playlist.getChildWidget('iptvMainCmpPlaylistMenu');
					self._playlist.setActiveChildWidget(playlistMenu);
				}
			});
			addPlaylistButton.addEventListener('select', function() {
				var device = self._device;
				var keyboard = self._keyboard;

				// Show Keyboard
				device.showElement({
					el: keyboard.outputElement,
					skipAnim: true
				});

				self.setActiveChildWidget(self._keyboard);
			});

			var dataSource = new DataSource(null, new DataPlaylist(), 'loadData', this._storage);
			var playlistMenu = new VerticalList('iptvMainCmpPlaylistMenu', new FormatterPlaylist(this._translator), dataSource);
			playlistMenu.addEventListener('keydown', function(evt) {
				if (evt.keyCode === KeyEvent.VK_UP || evt.keyCode === KeyEvent.VK_DOWN) {
					var childWidget = playlistMenu.getActiveChildWidget();
					if (self._focusedPlaylistChildWidgetId === childWidget.id && evt.keyCode === KeyEvent.VK_UP) {
						var button = self._playlist.getChildWidget('iptvMainCmpPlaylistAddButton');
						self._playlist.setActiveChildWidget(button);
					} else {
						self._focusedPlaylistChildWidgetId = childWidget.id;
					}
				}
			});
			playlistMenu.addEventListener('select', function() {
				console.log('select');
			});

			// Playlist
			var playlist = new Component('iptvMainCmpPlaylist');
			playlist.addClass('playlist');
			playlist.appendChildWidget(addPlaylistButton);
			playlist.appendChildWidget(playlistMenu);
			this._playlist = playlist;
			this.appendChildWidget(playlist);
		}
	});
});
