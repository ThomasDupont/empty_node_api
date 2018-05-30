/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const router = require('./../app/Router');

class Route {
    static execute(controller, method, route, verb) {
        router.add(verb, route, controller, method);
    }
}

Route.inBuild = true;
module.exports = Route;