const router = require('./../app/Router');

/**
 * Basic decorator call on app start
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 *
 * @type inBuild Decorator
 * @Method execute(controller, method, ...rest): Void
 */
class Route {
	static execute(controller, method, route, verb) {
		router.add(verb, route, controller, method);
	}
}

Route.inBuild = true;
module.exports = Route;
