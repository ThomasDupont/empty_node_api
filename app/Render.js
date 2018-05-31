/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const ControllerFactory = require('./ControllerFactory');
const DecoratorListener = require('./DecoratorListener');
const Response = require('./Response');

class Render {
	/**
     *
     * @param c Controller
     * @param m Method
     * @param req The request
     * @param res The reponse event
     */
	static render(c, m, req, res) {
		const decorators = ControllerFactory.getDecorator();

		const affectedController = decorators.find(e => e.controller === c);
		const affectedMethod = affectedController.methods.find(e => e.method === m);
		if (!affectedMethod) {
			throw new Error(`No Annotation doc found for method ${m}. All method must be documented`);
		}
		for (let i = 0; i < affectedMethod.decorators.length; i += 1) {
			const rDecorator = DecoratorListener.executeDecoratorInCall(req, affectedMethod.decorators[i], c, m);

			if (!(rDecorator instanceof Response)) {
				throw new TypeError(`The return type of ${affectedMethod.decorators[i].call}Decorator must be a instance of Response. ${typeof rDecorator} given`);
			}

			if (!rDecorator.success) {
				return res.status(rDecorator.code).send(rDecorator.result);
			}
		}
		return ControllerFactory.init(c, m, req).then(resp => res.status(resp.code).send(resp.result));
	}
}

module.exports = Render;
