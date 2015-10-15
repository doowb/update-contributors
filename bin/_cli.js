#!/usr/bin/env node

'use strict';

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

var MapConfig = require('map-config');
var commands = require('./commands');
var utils = require('./utils');
var App = require('../');
var app = new App();

var config = {};
config.update = utils.omit(argv, '_');
config.update.args = argv._;

commands.on('error', function (err) {
  console.log(utils.red('Error:'), err.message);
  process.exit(1);
});

commands.on('end', function (cmd) {
  if (cmd) {
    console.log(cmd, utils.gray('finished'));
  }
  process.exit(0);
});

var mapper = new MapConfig(commands, app);
mapper.process(config);
