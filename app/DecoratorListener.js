/**
 *
 *
 * @package
 * @licence MIT
 * @author Thomas Dupont
 */

const fs = require('fs');

class DecoratorListener {

    constructor() {
        this.decoratorActions = [];
        this.decoratorInstance = [];
    }

    getDecorator(dir, file, ext) {
        const method = new RegExp(/[a-z]*(?=Action)/, 'i');
        const decoratorList = Object.keys(this.decoratorInstance);
        fs.readFile(dir + file + ext, (err, data) => {
            let result = {
                controller: file,
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
                        let obj = {call : d, params: e.match('@'+d+'(.*?\\))').pop().match(/\'(.*?)\'/gm).map(e => e.replace(/\'/gm, ""))};
                        this.executeDecoratorInBuild(obj, file, block.method);
                        block.decorators.push(obj);
                    });
                    result.methods.push(block)
                }
            });
            this.decoratorActions.push(result);
            console.log(JSON.stringify(this.decoratorActions))
        })
    }

    initDecoratorList() {
        const files = fs.readdirSync(__dirname + '/../Decorator');
        files.forEach((file) => {
            this.decoratorInstance[file.split('.').shift()] = require(__dirname + '/../Decorator/' + file);
        });
    }

    executeDecoratorInBuild(build, controller, method) {
        const instance = this.decoratorInstance[build.call];
        if (instance.inBuild) {
            instance.execute(controller, method, ...build.params);
        }
    }

    executeDecoratorInCall(controller, method) {

    }
}

module.exports = DecoratorListener;
