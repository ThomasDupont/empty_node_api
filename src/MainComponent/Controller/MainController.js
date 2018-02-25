const CONF = require('../../../config/conf');
const Response = require('../../../app/Response');

/**
 * Main controller class
 */
class MainController {
	static mainAction(req) {
		return new Response(true, 200, {message: 'api ok'});
	}
}

module.exports = MainController;

