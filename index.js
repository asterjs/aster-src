'use strict';

var Rx = require('rx');
var glob = require('./glob');
var readFile = Rx.Observable.fromNodeCallback(require('fs').readFile);
var resolvePath = require('path').resolve;
var parse = require('aster-parse')();

module.exports = function (patterns, options) {
	options = options || {};

	var files = glob(patterns, options).do(console.log).flatMap(function (path) {
		var fullPath = resolvePath(options.cwd || '', path);

		return readFile(fullPath, 'utf-8').map(function (contents) {
			return {
				path: path,
				contents: contents
			};
		});
	});

	return options.parse !== false ? parse(files) : files;
};
