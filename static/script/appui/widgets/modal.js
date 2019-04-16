define('iptv/appui/widgets/modal', ['antie/widgets/component', 'antie/widgets/button', 'antie/widgets/label'], function(Component, Button, Label) {
	var ipTvModal = Component.extend({
		init: function init(id) {
			init.base.call(this, id);

			this.addClass('iptv-modal');
			this.addClass('modal');

			this._title = null;
			this._message = null;

			var modalHeaderLabel = new Label('iptvModalHeaderLabel');
			modalHeaderLabel.addClass('iptv-modal-header-label');
			this._title = modalHeaderLabel;
			var modalHeader = new Component('iptvModalHeader');
			modalHeader.addClass('iptv-modal-header');
			modalHeader.appendChildWidget(modalHeaderLabel);

			var modalMessage = new Label('iptvModalMessage');
			modalMessage.addClass('iptv-modal-message');
			this._message = modalMessage;
			var modalBody = new Component('iptvModalBody');
			modalBody.addClass('iptv-modal-body');
			modalBody.appendChildWidget(modalMessage);

			var modalContent = new Component('iptvModalContent');
			modalContent.addClass('iptv-modal-content');
			modalContent.appendChildWidget(modalHeader);
			modalContent.appendChildWidget(modalBody);

			var modalDialog = new Component('iptvModalDialog');
			modalDialog.addClass('iptv-modal-dialog');
			modalDialog.appendChildWidget(modalContent);

			var modalBackdrop = new Component('iptvModalBackdrop');
			modalBackdrop.addClass('iptv-modal-backdrop');

			this.appendChildWidget(modalBackdrop);
			this.appendChildWidget(modalDialog);
		},

		setText: function setText(message, title) {
			this._title.setText(title || 'Message');
			this._message.setText(message);
		}
	});

	return ipTvModal;
});
