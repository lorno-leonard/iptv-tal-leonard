define('iptv/appui/components/main', ['antie/widgets/component', 'antie/widgets/button', 'antie/widgets/label'], function(Component, Button, Label) {
	// All components extend Component
	return Component.extend({
		init: function init() {
			var self = this;

			// It is important to call the constructor of the superclass
			init.base.call(this, 'maincomponent');

			// Add label to the component
			var helloWorldLabel = new Label('helloWorldLabel', 'Hello World!');
			self.appendChildWidget(helloWorldLabel);

			// Add button to the component
			var testButton = new Button();
			testButton.appendChildWidget(new Label('Select me!'));
			testButton.addEventListener('select', function() {
				alert('I am selected!');
			});
			self.appendChildWidget(testButton);

			// calls Application.ready() the first time the component is shown
			// the callback removes itself once it's fired to avoid multiple calls.
			this.addEventListener('aftershow', function appReady() {
				self.getCurrentApplication().ready();
				self.removeEventListener('aftershow', appReady);
			});
		}
	});
});
