# aster-src
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Source files reader for aster.

## Usage

This module is part of [aster](https://npmjs.org/package/aster) and is available via `aster.src`.

You use it in build scripts whenever you want to get list of files for executing build pipeline:

```javascript
var aster = require('aster');

aster.src([
  '**/*.js',
  '!node_modules/**'
])
.map(plugin1(optionsForPlugin1))
.map(plugin2(optionsForPlugin2))
// ...
.subscribe(aster.runner);
```

`aster.src` returns [`Rx.Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) which emits single inner [`Rx.Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) of files presented as `{path: string, contents: string}` objects. 

## API

### src(patterns, options)

#### patterns
Type: `String|String[]`

List of patterns as array of strings or one comma-separated string.

#### options
Type: `Object`

`glob` module options (see https://github.com/isaacs/node-glob#options for details).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-src
[npm-image]: https://badge.fury.io/js/aster-src.png

[travis-url]: http://travis-ci.org/asterjs/aster-src
[travis-image]: https://secure.travis-ci.org/asterjs/aster-src.png?branch=master
