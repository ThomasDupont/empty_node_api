const CONF = require('./../config/conf');
const Response = require('./../app/Response');

/**
 * Decorator call each time
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 *
 * @type call Decorator
 * @Method execute(controller, method, request): Response
 */
class CheckInCall {
	static execute(controller, method, req) {
		if (CONF.secret !== req.header('secret')) {
			return new Response(false, 403, { error: 'access_denied' });
		}

		return new Response(true);
	}
}

CheckInCall.inBuild = false;
module.exports = CheckInCall;
