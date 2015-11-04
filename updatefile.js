'use strict';

var utils = require('./bin/utils');
var update = require('./');

module.exports = function(app, base, env) {
  var name = utils.gray(' ' + 'update-contributors');
  base.onStream(/package\.json$/, function (file, next) {
    console.log(name, 'updating contributors in', utils.gray(file.basename));
    update(file.json, function (err, results) {
      if (err) {
        console.log(name, utils.red(err));
        return next();
      }

      //=> updated package.json object
      file.json = results;
      next();
    });
  });
}
