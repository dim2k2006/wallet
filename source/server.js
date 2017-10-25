import fs from 'fs';
import http from 'http';
import https from 'https';

import app from './app';

const logger = require('../libs/logger')('wallet-app');

function listenCallback() {
	const {port} = this.address();

	logger.info(`Application started on ${port}`);
}

const LISTEN_PORT = process.env.NODE_HTTPS ? 443 : 3000;

if (process.env.NODE_HTTPS) {
	const protocolSecrets = {
		key: fs.readFileSync('./scripts/tls/fixtures/key.key'),
		cert: fs.readFileSync('./scripts/tls/fixtures/cert.crt')
	};

	https
		.createServer(protocolSecrets, app.callback())
		.listen(LISTEN_PORT, listenCallback);
}

if (!process.env.NODE_HTTPS) {
	http
		.createServer(app.callback())
		.listen(LISTEN_PORT, listenCallback);
}
