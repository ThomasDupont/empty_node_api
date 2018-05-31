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

    getDecorator(dir, file, ext) {
        const method = new RegExp(/[a-z]*(?=Action)/, 'i');
        const decoratorList = Object.keys(this.decoratorInstance);
        const data = fs.readFileSync(dir + file + ext);
        const controller = file.match('(.*)(?=Controller)').shift();
        let result = {
            controller,
            methods: []
        };
        const fullMatch = data.toString()
            .replace(/(\r\n|\n|\r)/gm,"")
            .split('/**');
        fullMatch.forEach(e => {
            let action = e.match(method);
            if (action) {
                let block = {
                    method: action.shift(),
                    decorators : []
                };
                decoratorList.forEach(d => {
                    let decoratorMatch = e.match('@'+d+'(.*?\\))');
                    if (decoratorMatch) {
                        let obj = {
                            call : d,
                            params: (decoratorMatch.pop().match(/\'(.*?)\'/gm) || []).map(e => e.replace(/\'/gm, ""))
                        };
                        this.executeDecoratorInBuild(obj, controller, block.method);
                        block.decorators.push(obj);
                    }
                });
                result.methods.push(block)
            }
        });
        this.decoratorActions.push(result);
    }

    initDecoratorList() {
        const files = fs.readdirSync(__dirname + '/../decorator');
        files.forEach((file) => {
            this.decoratorInstance[file.split('.').shift()] = require(__dirname + '/../decorator/' + file);
        });
    }

    executeDecoratorInBuild(build, controller, method) {
        const instance = this.decoratorInstance[build.call];
        if (instance.inBuild) {
            instance.execute(controller, method, ...build.params);
        }
    }

    executeDecoratorInCall(req, res, decorator, controller, method) {
        const decoratorInstance = this.decoratorInstance[decorator.call];
        if (!decoratorInstance.inBuild) {
            let exec = decoratorInstance.execute(controller, method, req);
            if (!exec.success) {
                return exec;
            }
        }
        return null;
    }
}

module.exports = new DecoratorListener();
