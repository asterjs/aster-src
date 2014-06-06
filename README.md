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

`aster.src` returns [`Rx.Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) which, in order, emits single inner observable collection of file ASTs wrapped with custom `{type: 'File', program: ..., loc: {source: 'fileName.js'}}` node. 

## API

### src(patterns, options)

#### patterns
Type: `String|String[]`

List of patterns as array of strings or one comma-separated string.

#### options
Type: `Object`

`glob` module options (see https://github.com/isaacs/node-glob#options for details).

#### options.parse
Type: `Function|Boolean|Object`
Default: `true`

* If preconfigured parser (i.e., `require('aster-parse-js')({loc: false})`) or custom `function (files) { ... }` is passed, it will be used as is.
* If boolean is passed:
  * `true` means files should be parsed with parser associated with file extension (see [aster-parse](https://github.com/asterjs/aster-parse)).
  * `false` means files should not be parsed and so they are pushed as `{path: string, contents: string}` object.
* If object is passed, it will be used as [parsing options](https://github.com/asterjs/aster-parse#parseoptions).

### src.registerParser(extension, parser)
Method for registering custom parsers associated with extension, see [asterParse.registerParser](https://github.com/asterjs/aster-parse#parseregisterparserextension-parser) for details.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-src
[npm-image]: https://badge.fury.io/js/aster-src.png

[travis-url]: http://travis-ci.org/asterjs/aster-src
[travis-image]: https://secure.travis-ci.org/asterjs/aster-src.png?branch=master
