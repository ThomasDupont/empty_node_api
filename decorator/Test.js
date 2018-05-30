/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

class Test {
    static execute(controller, method) {
        console.log('call test decorator on ' + controller + 'Controller , method '+ method);
    }
}

Test.inBuild = true;
module.exports = Test;
