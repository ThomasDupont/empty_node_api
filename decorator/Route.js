/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const Router = require('./../app/Router');

class Route {
    static execute(controller, method, route, verb) {
        Router.add(verb, route, controller, method);
        /*
        app[verb.toLowerCase()](route, (req, res) => {
            new Render().singleCall(controller.match('(.*)(?=Controller)').shift(), method, req, res);
        });
        */
    }
}

Route.inBuild = true;
module.exports = Route;