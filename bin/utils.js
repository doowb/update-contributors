'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('cwd');
require('async');
require('load-pkg', 'pkg');
require('ansi-red', 'red');
require('ansi-gray', 'gray');
require('write', 'writeFile');
require('ansi-green', 'green');
require('object.omit', 'omit');
require = fn;
module.exports = utils;
