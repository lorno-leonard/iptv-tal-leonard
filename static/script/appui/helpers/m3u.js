define('iptv/appui/helpers/m3u', [], function() {
	return {
		parse: function(data) {
			data = data.trim(/[\r\n]/);
			data = data.split(/\n/);
			var block = {};
			var groupTitle;
			var result = [];
			data.forEach(function(line) {
				line = line.trim(/\r/);

				// Custom format for lines like: === [AL] ===
				var m = /^=* (.+) =+$/.exec(line);
				if (m) {
					groupTitle = m[1];
					block['GROUP-TITLE'] = groupTitle;
					return;
				}

				m = /^#([^:]+)(:(.*))?$/.exec(line);
				if (m) {
					if (m[1] === 'EXTINF') {
						result.push(block);
						block = {};
						if (groupTitle) {
							block['GROUP-TITLE'] = groupTitle;
						}
						var n = /^(-?\d+(\.\d+)?)(.*)$/.exec(m[3]);
						block.DURATION = parseInt(n[1], 10);
						line = n[3];
						while (line) {
							n = /^,(.*)$/.exec(line);
							if (n) {
								block.TITLE = n[1];
								line = '';
							} else {
								n = /^ +([^=]+)="([^"]*)"(.*)$/.exec(line);
								block[n[1].toUpperCase()] = n[2];
								line = n[3];
							}
						}
					}
					block[m[1].toUpperCase()] = m[3] || '';
				} else if (line) {
					block.URL = line;
				}
			});
			if (Object.keys(block).length > 0) {
				result.push(block);
			}

			return Object.assign(result[0], { ITEMS: result.splice(1) }, {});
		}
	};
});
