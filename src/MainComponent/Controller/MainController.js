const CONF = require('../../../config/conf');
const Response = require('../../../app/Response');

/**
 * Main controller class
 */
class MainController {
	/**
	 * @Route('/info', 'POST')
     * @Test()
	 * @CheckInCall()
	 *
     * @param req
     * @returns {Response}
     */
	static mainAction(req) {
        /**
		 *
         */
		return new Response(true, 200, { message: 'api ok' });
	}

	/**
	 *
     * @param req
     * @returns {Response}
     */
	static testAction(req) {
		return new Response(true, 200, { message: 'test action' });
	}

    /**
	 * @Route('/customer', 'GET')
	 * @CheckInCall()
     * @param req
     */
	static getInfoAction(req) {
        return new Response(true, 200, { result: {
        	lastname: 'Dupont',
			firstname: 'Thomas'
		}});
	}
}

module.exports = MainController;

