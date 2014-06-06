/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	src = require('..');

it('test', function (done) {
	this.timeout(1000);

	assert.ok(src.registerParser);

	src([
		'**/*.js',
		'!node_modules/**'
	], {
		parse: require('aster-parse-js')({loc: false})
	})
	.zip(['glob.js', 'index.js', 'test/test.js'], function (file, fileName) {
		assert.equal(file.loc.source, fileName);
		assert.equal(file.program.type, 'Program');
	})
	.subscribe(function () {}, done, done);
});

