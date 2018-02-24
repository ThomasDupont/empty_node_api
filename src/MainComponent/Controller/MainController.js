const CONF = require('../../../config/conf');

/**
 * Main controller class
 */
class MainController {
	static mainAction(req) {
		return { status: 'ok', message: 'api ok', statusCode: 200 };
	}
}

module.exports = MainController;

