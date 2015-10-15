'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;
require('ansi-red', 'red');
require('ansi-gray', 'gray');
require('ansi-green', 'green');
require('object.omit', 'omit');
require = fn;
module.exports = utils;
