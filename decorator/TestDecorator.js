/**
 * Test decorator without params call on app start
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 *
 * @type inBuild Decorator
 * @Method execute(controller, method, ...rest): Void
 */
class Test {
	static execute(controller, method) {
		console.log(`call test decorator on ${controller}Controller , method ${method}`);
	}
}

Test.inBuild = true;
module.exports = Test;
