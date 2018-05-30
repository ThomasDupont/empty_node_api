require('dotenv').config();
const express = require('express');
const app = express();
const ControllerFactory = require('./app/ControllerFactory');
const Router = require('./app/Router');
const Render = require('./app/Render');
const CONF = require('./config/conf');
const bodyParser = require('body-parser');

/**
 * Main class
 *
 * @author Thomas Dupont
 */
class Main extends Render {
	constructor() {
		super();
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
		ControllerFactory.launch();

		app.use(CONF.APIURL, require('./app/Router').router);
        app.listen(3000, () => {
            console.log('launched');
        });
	}

	initRouter() {
		Router.add('get', '', 'Main', 'main');
		//app.get(CONF.APIURL, this.render.bind(this, 'Main', 'main'));
	}
}

new Main();

module.exports = app;
