const fs = require('fs');
const decorator = require('./DecoratorListener');

const controllers = {};

function readRecursive(dir) {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		if (fs.statSync(dir + file).isDirectory()) {
			readRecursive(`${dir + file}/`);
		} else if (file.indexOf('Controller') !== -1) {
			const fileString = file.split('.').shift();
			decorator.getDecorator(dir, fileString, '.js');
			controllers[fileString] = require(dir + fileString);
		}
	});
}

class ControllerFactory {
	static launch() {
		decorator.initDecoratorList();
		readRecursive(`${__dirname}/../src/`);
	}

	static async init(controller, method, req) {
		return controllers[`${controller}Controller`][`${method}Action`](req);
	}

	static getDecorator() {
		return decorator.decoratorActions;
	}
}

module.exports = ControllerFactory;
