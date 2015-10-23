'use strict';

var Emitter = require('component-emitter');
var path = require('path');
var update = require('../');
var utils = require('./utils');

var commands = {
  update: function (config) {
    var async = utils.async;
    var fp = path.join(utils.cwd(process.cwd()), 'package.json');
    console.log(utils.green('Updating'), utils.gray(fp));
    async.waterfall([
      async.apply(update, utils.pkg),
      function (pkg, next) {
        utils.writeFile(fp, JSON.stringify(pkg, null, 2), next);
      }
    ], function (err) {
      if (err) return commands.emit('error', err);
      console.log(utils.green('Saved   '), utils.gray(fp));
      commands.emit('end');
    });
  }
};

module.exports = Emitter(commands);
