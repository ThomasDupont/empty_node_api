require('dotenv').config();
const express = require('express');
const app = express();
require('./app/ControllerFactory').launch();
const router = require('./app/Router');
const CONF = require('./config/conf');
const bodyParser = require('body-parser');

/**
 * Main class
 *
 * @author Thomas Dupont
 */
class Main {
	constructor() {
		app.use(bodyParser.urlencoded({ extended: false }));
		// parse application/json
		app.use(bodyParser.json());
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', true);
			// Pass to next layer of middleware
			next();
		});

		this.initRouter();

		app.use(CONF.APIURL, require('./app/Router').router);

        app.listen(3000, () => {
            console.log('launched');
        })
	}

	initRouter() {
        router.add('get', '', 'Main', 'main');
        router.add('get', '/test', 'Main', 'main');
	}
}

new Main();

module.exports = app;
