var Rx = require('rx');
var Glob = require('glob').Glob;
var Minimatch = require('minimatch').Minimatch;

function rxGlob(pattern, options) {
	return Rx.Observable.create(function (observer) {
		var glob =
			new Glob(pattern, options)
			.on('match', observer.onNext.bind(observer))
			.on('error', observer.onError.bind(observer))
			.on('end', observer.onCompleted.bind(observer));

		return glob.removeAllListeners.bind(glob);
	});
}

module.exports = function (patterns, options) {
	if (typeof patterns === 'string') {
		patterns = patterns.split(',');
	}

	if (options.noglob) {
		return Rx.Observable.fromArray(patterns);
	}

	var notBad =
		patterns
		.filter(function (pattern) { return pattern[0] === '!' })
		.map(function (pattern) {
			return new Minimatch(pattern, options);
		});

	return Rx.Observable.fromArray(patterns)
		.filter(function (pattern) { return pattern[0] !== '!' })
		.flatMap(function (pattern) {
			return rxGlob(pattern, options);
		})
		.filter(function (file) {
			return notBad.every(function (mm) {
				return mm.match(file);
			});
		});
};
