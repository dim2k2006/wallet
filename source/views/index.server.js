import React from 'react';
import {renderToString} from 'react-dom/server';
import {extractCritical} from 'emotion-server';
import serialize from 'serialize-javascript';
import App from '../client/components/App';

export default function (appData) {
	const app = renderToString(<App data={appData} />);
	const {html, ids, css} = extractCritical(app);
	const viewData = `window.__data=${serialize({ids, appData})};`;

	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<title>Node School App</title>
				<link rel='shortcut icon' href='/favicon.ico' />
				<link rel='stylesheet' href='/css/main.css' />
				<style type='text/css' dangerouslySetInnerHTML={{__html: css}} />
			</head>
			<body>
				<div id='root' dangerouslySetInnerHTML={{__html: html}} />

				<script dangerouslySetInnerHTML={{__html: viewData}} />
				<script src='/js/index.js' />
			</body>
		</html>
	);
}
