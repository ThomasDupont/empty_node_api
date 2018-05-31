const CONF = require('../../../config/conf');
const Response = require('../../../app/Response');

/**
 * Main controller class
 */
class MainController {

    /**
	 * @Route('/', 'POST')
     * @Test()
	 * @CheckInCall()
	 * 
     * @param req
     * @returns {Response}
     */
	static mainAction(req) {
		return new Response(true, 200, {message: 'api ok'});
	}

    /**
	 *
     * @param req
     * @returns {Response}
     */
	static testAction(req) {
		return new Response(true, 200, {message: 'test action'});
	}
}

module.exports = MainController;

