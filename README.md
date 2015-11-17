# update-contributors [![NPM version](https://badge.fury.io/js/update-contributors.svg)](http://badge.fury.io/js/update-contributors)  [![Build Status](https://travis-ci.org/doowb/update-contributors.svg)](https://travis-ci.org/doowb/update-contributors)

> Update contributors property in package.json with current github contributors.

## CLI

```sh
$ npm install -g update-contributors
```

After globably installing, run `update-contrib` at the commandline from a repository.
This will add any contributors found on github to the `contributors` array inside `package.json`.

**Warning** the `repository` property needs to be in the `package.json` following one of the github formats found in the [npm docs](https://docs.npmjs.com/files/package.json#repository)

```sh
$ update-contrib
```

## Update

When installed globally, [update-contributors](https://github.com/doowb/update-contributors) will work with [update](https://github.com/update/update) and run automatically.

```sh
$ update
```

## Usage

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i update-contributors --save
```

```js
var update = require('update-contributors');
```

## API

### [update](index.js#L35)

Pulldown github contributors and update the `contributors` property in the provided package.json object.

**Params**

* `pkg` **{Object}**: Object representing the package.json to update.
* `options` **{Object}**: Options to use for github authentication.
* `options.creds` **{Object}**: Github credentials. May be a token or a username and password. If execuled [ask-for-github-auth](https://github.com/doowb/ask-for-github-auth) will be used.
* `options.stringify` **{Boolean}**: When set to `false` the contributors will be objects in the `contributors` array. Defaults to `true`.
* `cb` **{Function}**: Callback function that will get an `err` when an error happens or a `results` with the updated package.json object.

**Example**

```js
var pkg = require('./package.json');
update(pkg, function (err, results) {
  if (err) return console.error(err);
  console.log(reults);
  //=> updated package.json object
});
```

## Related projects

* [github-base](https://www.npmjs.com/package/github-base): Base methods for creating node.js apps that work with the GitHub API. | [homepage](https://github.com/jonschlinkert/github-base)
* [github-contributors](https://www.npmjs.com/package/github-contributors): Generate a markdown or JSON list of contributors for a project using the GitHub API. | [homepage](https://github.com/jonschlinkert/github-contributors)
* [stringify-author](https://www.npmjs.com/package/stringify-author): Stringify an authors object to `name <email> (url)`. | [homepage](https://github.com/jonschlinkert/stringify-author)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/update-contributors/issues/new).

## Author

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2015 Brian Woodward
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 17, 2015._