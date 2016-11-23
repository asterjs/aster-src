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

#### options.srcObserver

Can be used to customize how to created an [Observable](http://reactivex.io/documentation/observable.html) for javascript sources to be parsed. By default `patterns` is used by `glob` to pattern match files and then read each file as an observable stream.

```js
function (patterns, options) {
    // return Observable
}
```

If you are observing source code that does not reside in files that can be filtered via the `patterns`, simply ignore and leave out this argument: 

`function (options) { ... }`

The default `Observable` factory function used:

```js
var readFile = Rx.Observable.fromNodeCallback(require('fs').readFile);

function filesSrc(patterns, options) {
    return glob(patterns, options).flatMap(function (path) {
        var fullPath = resolvePath(options.cwd || '', path);

        return readFile(fullPath, 'utf-8').map(function (contents) {
            return {
                path: path,
                contents: contents
            };
        });
    });
}
```

You can pass either a factory function or an Observable directly

```js
function srcObserver(options) {
    return Rx.Observable.of(options.sources);
}

const sources = ['var a = 1', 'var b = a + 2']

// alternatively:
// const srcObserver = Rx.Observable.of(options.sources);

aster.src({
    srcObserver,
    sources,
})
```

#### options.noglob
Type: `Boolean`
Default: `false`

Set to true if you want `patterns` to be used as explicit list of files instead of globbing patterns (used by [aster-watch](https://github.com/asterjs/aster-watch)).

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
