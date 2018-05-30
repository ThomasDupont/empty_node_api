const fs = require('fs');
const DecoratorListener = require('./DecoratorListener');

const controllers = {};
const decorator = new DecoratorListener();

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

	static init(controller, method, req) {
		return controllers[`${controller}Controller`][`${method}Action`](req);
	}
}

module.exports = ControllerFactory;
