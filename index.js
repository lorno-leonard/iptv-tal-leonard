var express = require('express');
var app = express();
var AntieFramework = require('tal');
var mustacheExpress = require('mustache-express');

var port = process.env.PORT || 1337;

// Setup mustache for view templating
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	// Path to device configuration directory
	var configPath = 'node_modules/tal/config';
	var antie = new AntieFramework(configPath);

	// Get normalised brand and model from url parameters
	var device_brand = antie.normaliseKeyNames(req.query.brand || 'default');
	var device_model = antie.normaliseKeyNames(req.query.model || 'webkit');

	// Load framework device config files, named BRAND-MODEL-default.json
	var device_configuration;

	try {
		device_configuration = antie.getConfigurationFromFilesystem(device_brand + '-' + device_model + '-default', '/devices');
	} catch (e) {
		res.status(406).render('error', {
			exception: e
		});

		return;
	}

	// Substitute application_id wherever /%application%/ token is present in device configuration
	var application_id = 'iptv';
	device_configuration = device_configuration.replace(/%application%/g, application_id);

	var device_configuration_decoded = JSON.parse(device_configuration);

	res.render('index', {
		root_html_tag: antie.getRootHtmlTag(device_configuration_decoded),
		headers: antie.getDeviceHeaders(device_configuration_decoded),
		application_id: application_id,
		device_configuration: device_configuration,
		extra_body: antie.getDeviceBody(device_configuration_decoded)
	});
});

app.use('/tal', express.static('node_modules/tal'));
app.use('/static', express.static('static'));

app.listen(port, function() {
	console.log('Example app listening on port ' + port);
});
