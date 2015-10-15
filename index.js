
import async from 'async';
import merge from 'mixin-deep';
import GitHub from 'github-base';
import DataStore from 'data-store';
import ghUrl from 'parse-github-url';
import ask from 'ask-for-github-auth';
import ghContrib from 'github-contributors';

const store = new DataStore('update-contributors');

/**
 * Pulldown github contributors and update the `contributors` property
 * in the provided package.json object.
 *
 * ```js
 * var pkg = require('./package.json');
 * update(pkg, function (err, results) {
 *   if (err) return console.error(err);
 *   console.log(reults);
 *   //=> updated package.json object
 * });
 * ```
 *
 * @param  {Object} `pkg` Object representing the package.json to update.
 * @param  {Object} `options` Options to use for github authentication.
 * @param {Function} `cb` Callback function that will get an `err` when an error happens or a `results` with the updated package.json object.
 * @api public
 * @name update
 */

export default function(pkg, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  let repo;
  if (typeof pkg.repository === 'object') {
    repo = ghUrl(pkg.repository.url);
  } else {
    repo = ghUrl(pkg.repository);
  }
  if (!repo) return cb(new Error('Invalid repository property.'));
  async.waterfall([
    // ask for creds
    async.apply(ask, {store}),

    // update creds on options
    (creds, next) => {
      options = merge({}, options, creds);
      next();
    },

    // get contributors
    async.apply(ghContrib, repo.repopath, options),

    // get contributor information
    (contributors, next) => {
      const github = new GitHub(options);
      pkg.contributors = pkg.contributors || [];
      pkg.contributors = Array.isArray(pkg.contributors) ? pkg.contributors : pkg.contributors;
      async.eachSeries(contributors, (contributor, nextContributor) => {
        github.get('/users/:login', contributor, (err, user) => {
          if (err) return nextContributor(err);
          pkg.contributors.push({
            name: user.name || user.login,
            email: user.email || '',
            url: user.html_url
          });
          nextContributor();
        });
      }, next);
    },

    // de-dup
    (next) => {
      let contributors = [];
      pkg.contributors.forEach((contributor) => {
        if (contributors.filter((existing) => {return existing.name === contributor.name;}).length === 0) {
          contributors.push(contributor);
        }
      });
      pkg.contributors = contributors;
      next();
    }
  ], (err) => {
    if (err) return cb(err);
    cb(null, pkg);
  });


}
