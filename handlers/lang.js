module.exports = client => {
	client.lang = function lang(message, lang) {
		if(!lang){
			client.logger.error("LANG UNDEFINED");
			lang = "en";
		}
		const langjson = require(`../config/languages/${lang}.json`);
		return langjson[message];
	}; 
}; 