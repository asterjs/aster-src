/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	src = require('..');

it('test', function (done) {
	this.timeout(1000);

	src([
		'**/*.js',
		'!node_modules/**'
	])
	.subscribe(function () {}, done, done);
});

