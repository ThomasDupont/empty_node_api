/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const Response = require('./../app/Response');
const CONF = require('./../config/conf');

class CheckInCall {
    static execute(controller, method, req) {
        if (CONF.secret !== req.header('secret')) {
            return new Response(false, 400, { error: 'bad_request'});
        }

        return new Response(true);
    }
}

CheckInCall.inBuild = false;
module.exports = CheckInCall;
