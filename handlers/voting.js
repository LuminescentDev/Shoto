const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 40015;
module.exports = client => {

	app.use(bodyParser.json());

	//on post to server check if authorization matches
	app.post("/", function (req, res) {
		let body = req.body;
		let headers = req.headers;
		if(headers.authorization !== client.config.tpogg_webhook_auth){
			res.statusCode = 401;
		}else{
			res.statusCode = 200;
			res.json({
				message: "ok got it!"
			});
			require("../database/models/voteget")(client,body);
		}


	});
    
	app.listen(port, () => {
    
		client.logger.info("Webhook server loaded",);
    
	});

}; 