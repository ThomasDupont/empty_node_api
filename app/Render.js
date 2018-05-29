/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const ControllerFactory = require('./ControllerFactory');

class Render {
	/**
     *
     * @param c Controller
     * @param m Method
     * @param req The request
     * @param res The reponse event
     */
	async render(c, m, req, res) {
		const response = await ControllerFactory.init(c, m, req);
		res.status(response.code);
		res.send(response.result);
	}
}

module.exports = Render;
