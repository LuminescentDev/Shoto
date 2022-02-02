const {token} = require('../config/config.json');
module.exports = client => {
    client.login(token);
    client.logger.info('Logged in!');
}