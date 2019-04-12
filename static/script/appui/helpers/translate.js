define('iptv/appui/helpers/translate', ['antie/class', 'iptv/appui/translations/en', 'iptv/appui/translations/de'], function(Class, en, de) {
	var Translate = Class.extend({
		init: function init(lang) {
			this._locales = {
				en: en,
				de: de
			};
			this._lang = lang;
			this.__ = this.translate;
		},
		setLocale: function setLocale(lang) {
			this._lang = lang;
		},
		translate: function translate(key) {
			return this._locales[this._lang][key] || key;
		}
	});

	return Translate;
});
