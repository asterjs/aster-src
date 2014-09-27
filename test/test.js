/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	src = require('..');

it('can register parsers', function () {
	assert.equal(src.registerParser, require('aster-parse').registerParser);
});

it('works', function (done) {
	this.timeout(1000);

	src([
		'**/*.js',
		'!node_modules/**'
	], {
		parse: {loc: false}
	})
	.concatAll()
	.do(function (file) {
		assert.equal(file.program.type, 'Program');
	})
	.pluck('loc').pluck('source')
	.toArray()
	.do(function (sources) {
		assert.deepEqual(sources.sort(), ['glob.js', 'index.js', 'test/test.js']);
	})
	.subscribe(function () {}, done, done);
});

it('works for explicit list of files', function (done) {
	this.timeout(1000);

	var files = ['glob.js', 'index.js', 'test/test.js'];

	src(files, {noglob: true})
	.concatAll()
	.zip(files, function (file, fileName) {
		assert.equal(file.loc.source, fileName);
		assert.equal(file.program.type, 'Program');
	})
	.subscribe(function () {}, done, done);
});
