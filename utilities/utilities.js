const {get} = require("https");

	exports.fetch = function fetch(url) {
		return new Promise((resolve, reject) => {
			get(url, res => {
				const {statusCode} = res;
				if(statusCode !== 200) {
					res.resume();
					reject(`Request failed. Status code: ${statusCode}`);
				}
				res.setEncoding("utf8");
				let rawData = "";
				res.on("data", chunk => {rawData += chunk});
				res.on("end", () => {
					try {
						const parsedData = JSON.parse(rawData);
						resolve(parsedData);
					} catch(e) {
						reject(`Error: ${e.message}`);
					}
				});
			}).on("error", err => {
				reject(`Error: ${err.message}`);
			});
		});
	};

	exports.convertTime = function convertTime(duration) {

		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return duration < 3600000 ? minutes + ":" + seconds : hours + ":" + minutes + ":" + seconds;
	}

	exports.convertNumber = function convertNumber(number, decPlaces) {

		decPlaces = Math.pow(10,decPlaces);

		var abbrev = [ "K", "M", "B", "T" ];


		for (var i=abbrev.length-1; i>=0; i--) {

			var size = Math.pow(10,(i+1)*3);

			if(size <= number) {
                
				number = Math.round(number*decPlaces/size)/decPlaces;


				if((number === 1000) && (i < abbrev.length - 1)) {
					number = 1;
					i++;
				}

				number += abbrev[i];

				break;
			}
		}

		return number;
	};

	exports.convertHmsToMs = function convertHmsToMs(hms) {
		if (hms.length < 3) {
			return hms = ((+a[0]) * 1000);
		} else if (hms.length < 6) {
			const a = hms.split(":");
			return hms = (((+a[0]) * 60 + (+a[1])) * 1000);
		} else {
			const a = hms.split(":");
			return hms = (((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) * 1000);
		}
	}

	exports.progressbar = function progressbar(total, current, size, line, slider) {
		if (current > total) {
			return line.repeat(size + 2);
		} else {
			const percentage = current / total;
			const progress = Math.round((size * percentage));
			const emptyProgress = size - progress;
			const progressText = line.repeat(progress).replace(/.$/, slider);
			const emptyProgressText = line.repeat(emptyProgress);
			return progressText + emptyProgressText;
		}
	}