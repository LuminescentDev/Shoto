module.exports = client => {
	client.lang = function lang(message, lang) {
		const langjson = require(`../config/languages/${lang}.json`);
		return langjson[message];
	};
};