module.exports = client => {
	client.error = function error(err, message) {
		client.logger.error(err);
        const errormsg = "**ERROR DETECTED**" +
        "This error has been logged" +
        "Please report this error with the exact steps taken to reproduce at https://guilded.gg/AkiraDev"
		message.channel.send(errormsg);
	};
	client.logger.info('Error Handler Loaded');
};