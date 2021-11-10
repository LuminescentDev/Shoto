module.exports = async (client, status) => {

    if (!status) client.logger.info("Successful post");
    else client.logger.error(`post error: ${status}`);

	

};