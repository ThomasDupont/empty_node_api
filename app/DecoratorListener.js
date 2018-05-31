/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const fs = require('fs');
const Response = require('./Response');

class DecoratorListener {
	constructor() {
		this.decoratorActions = [];
		this.decoratorInstance = [];
	}

	/**
     *
     * @param dir
     * @param file
     * @param ext
     */
	getDecorator(dir, file, ext) {
		const method = new RegExp(/[a-z]*(?=Action)/, 'i');
		const decoratorList = Object.keys(this.decoratorInstance);
		const data = fs.readFileSync(dir + file + ext);
		const controller = file.match('(.*)(?=Controller)').shift();
		const result = {
			controller,
			methods: [],
		};
		const fullMatch = data.toString()
			.replace(/(\r\n|\n|\r)/gm, '')
			.split('/**');
		fullMatch.forEach((e) => {
			const action = e.match(method);
			if (action) {
				const block = {
					method: action.shift(),
					decorators: [],
				};
				decoratorList.forEach((d) => {
					const decoratorMatch = e.match(`@${d}(.*?\\))`);
					if (decoratorMatch) {
						const obj = {
							call: d,
							params: (decoratorMatch.pop().match(/'(.*?)'/gm) || []).map(brut => brut.replace(/'/gm, '')),
						};
						this.executeDecoratorInBuild(obj, controller, block.method);
						block.decorators.push(obj);
					}
				});
				result.methods.push(block);
			}
		});
		this.decoratorActions.push(result);
	}

	/**
     * @void
     */
	initDecoratorList() {
		const files = fs.readdirSync(`${__dirname}/../decorator`);
		files.forEach((file) => {
			this.decoratorInstance[
			    file.split('.')
					.shift()
					.match('(.*)(?=Decorator)')
					.shift()
			] = require(`${__dirname}/../decorator/${file}`);
		});
	}

	/**
     *
     * @param build
     * @param controller
     * @param method
     */
	executeDecoratorInBuild(build, controller, method) {
		const instance = this.decoratorInstance[build.call];
		if (instance.inBuild) {
			instance.execute(controller, method, ...build.params);
		}
	}

	/**
     *
     * @param req
     * @param res
     * @param decorator
     * @param controller
     * @param method
     * @returns {Response}
     */
	executeDecoratorInCall(req, decorator, controller, method) {
		const decoratorInstance = this.decoratorInstance[decorator.call];
		if (!decoratorInstance.inBuild) {
			const exec = decoratorInstance.execute(controller, method, req);
			if (!exec.success) {
				return exec;
			}
		}
		return new Response(true);
	}
}

module.exports = new DecoratorListener();
