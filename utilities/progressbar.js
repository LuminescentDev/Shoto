module.exports = {
	progressbar: function (total, current, size, line, slider) {
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

};