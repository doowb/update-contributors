'use strict';

var Emitter = require('component-emitter');
// var writeFile = require('write');
// var path = require('path');

// var utils = require('../lib/utils');

var commands = {
  update: function (config, app) {
    console.log('updating:');
    console.log(' * update-contrib');
    console.log('TODO: fill out these help messages');
    console.log(config);

    commands.emit('end');
  }

  // target: function (config, app) {
  //   var cmds = ['add', 'remove', 'list'];
  //   // add
  //   // remove
  //   // list
  //   if (!config.args || !config.args.length) {
  //     subcommandWarning(cmds);
  //     return commands.emit('end');
  //   }
  //   var subcommand = config.args.shift();
  //   if (cmds.indexOf(subcommand) === -1) {
  //     subcommandWarning(cmds);
  //     return commands.emit('end');
  //   }

  //   load(app);
  //   if (subcommand === 'list') {
  //     var count = 0;
  //     utils.reduce(app.scaffolds.get('targets'), function (acc, target, key) {
  //       console.log(utils.gray(key));
  //       count++;
  //     }, []);
  //     if (count === 0) {
  //       console.log('No targets found.');
  //     }
  //     return commands.emit('end');
  //   }

  //   if (!config.args.length) {
  //     console.log(utils.red('Warning:'), utils.gray('target ' + subcommand), 'expects a `name`.');
  //     return commands.emit('end');
  //   }

  //   var name = config.args.shift();

  //   if (subcommand === 'remove') {
  //     if (typeof app.scaffolds.cache.targets[name] === 'undefined') {
  //       console.log(utils.gray(name), 'not found in', utils.gray('manifest.json'));
  //       return commands.emit('end');
  //     }

  //     delete app.scaffolds.cache.targets[name];
  //     return save(app, function (err) {
  //       if (err) return commands.emit('error', err);
  //       console.log(utils.gray(name), 'removed from', utils.gray('manifest.json'));
  //       commands.emit('end');
  //     })();
  //   }

  //   var target = {};
  //   target.src = config.files || config.f || config.src || config.args.shift();
  //   target.dest = config.dest || config.d || config.args.shift() || ''
  //   target.cwd = config.cwd || ''
  //   target.expand = config.expand || config.x || false;
  //   target.flatten = config.flatten || false;

  //   if (target.cwd && target.cwd.length === 1 && target.cwd === '.') {
  //     target.cwd = process.cwd();
  //   }

  //   app.scaffolds.addTarget(name, target);
  //   save(app, function (err) {
  //     if (err) return commands.emit('error', err);
  //     console.log(utils.gray(name), 'added to', utils.gray('manifest.json'));
  //     commands.emit('end');
  //   })();
  // }
};

module.exports = Emitter(commands);
