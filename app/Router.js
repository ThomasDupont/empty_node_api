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
    static add(verb, route, controller, action) {
        console.log(router)
        router[verb](route, Render.render.bind(this, controller, action));
    }
}

module.exports = Router;
module.exports.router = router;
