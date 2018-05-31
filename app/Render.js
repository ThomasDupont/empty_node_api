/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const ControllerFactory = require('./ControllerFactory');
const DecoratorListener = require('./DecoratorListener');

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

		let affectedController = decorators.find(e => e.controller === c);
		let affectedMethod = affectedController.methods.find(e => e.method === m);
        if (!affectedMethod) {
        	throw new Error('No Annotation doc found for method ' + m + '. All method must be documented');
		}
		for (let i = 0; i < affectedMethod.decorators.length; i += 1) {
            let resultDecorator = DecoratorListener.executeDecoratorInCall(req, res, affectedMethod.decorators[i], c, m);
            if (!resultDecorator.success) {
                res.status(resultDecorator.code);
                res.send(resultDecorator.result);
                return;
			}
		}
		ControllerFactory.init(c, m, req).then(response => res.status(response.code).send(response.result));
	}
}

module.exports = Render;
