'use strict';

var Rx = require('rx');
var glob = require('./glob');
var readFile = Rx.Observable.fromNodeCallback(require('fs').readFile);
var resolvePath = require('path').resolve;
var asterParse = require('aster-parse');

module.exports = function (patterns, options) {
	options = options || {};

	var files = glob(patterns, options).flatMap(function (path) {
		var fullPath = resolvePath(options.cwd || '', path);

		return readFile(fullPath, 'utf-8').map(function (contents) {
			return {
				path: path,
				contents: contents
			};
		});
	});

	var parse;

	switch (typeof options.parse) {
		case 'function':
			parse = options.parse;
			break;

		case 'boolean':
		case 'undefined':
			if (options.parse !== false) {
				parse = asterParse();
			}
			break;

		case 'object':
			parse = asterParse(options.parse);
			break;

		default:
			throw new TypeError('Unknown options.parse format.');
	}

	return Rx.Observable.return(parse ? parse(files) : files);
};

module.exports.registerParser = asterParse.registerParser;
