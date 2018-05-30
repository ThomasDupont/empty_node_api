/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */
const router = require('express').Router();
const Render = require('./Render');

class Router {
    add(verb, route, controller, action) {
        router[verb.toLowerCase()](route, Render.render.bind(this, controller, action));
    }
}

module.exports = new Router;
module.exports.router = router;
