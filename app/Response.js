
class Response {
	constructor(success, code = 200, result = {}) {
		this.success = success;
		this.code = code;
		this.result = result;
	}
}

module.exports = Response;
