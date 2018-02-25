
const fs = require('fs');

const controllers = {};

function readRecursive(dir) {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		if (fs.statSync(dir + file).isDirectory()) {
			readRecursive(`${dir + file}/`);
		} else if (file.indexOf('Controller') !== -1) {
			const fileString = file.split('.')[0];
			controllers[fileString] = require(dir + fileString);
		}
	});
}

readRecursive(`${__dirname}/../src/`);

class ControllerFactory {
	static init(controller, method, req) {
		return controllers[`${controller}Controller`][`${method}Action`](req);
	}
}

module.exports = ControllerFactory;
