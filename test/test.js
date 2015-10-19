import fs from 'fs';
import path from 'path';
import assert from 'assert';
import update from '../index';

describe('update-contributors', function() {
  this.timeout(0);

  it('should get contributors', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    let options = {};

    // on travis-ci
    if (process.env.CI) {
      options.creds = {
        username: 'fake',
        password: 'password'
      };
    }

    update(pkg, options, (err, results) => {
      if (err) return done(err);
      assert(results);
      assert(Array.isArray(results.contributors));
      assert(results.contributors.length > 0);
      done();
    });
  });

  it('should return an error when using invalid credentials', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    let options = {};
    options.creds = {
      username: 'fake',
      password: 'password'
    };

    update(pkg, options, function(err, results) {
      if (err) {
        assert.equal(err.message, 'Bad credentials');
        return done();
      }
      done(new Error('Expected an error'));
    });
  });

  it('should return an error when repo does not exist', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    pkg.repository = {url: 'doowb/this-repo-show-not-exist'};
    update(pkg, function(err, results) {
      if (err) {
        assert.equal(err.message, 'Not Found');
        return done();
      }
      done(new Error('Expected an error'));
    });
  });

  it('should return an error repository property is invalid', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    pkg.repository = {url: ''};
    update(pkg, function(err, results) {
      if (err) {
        assert.equal(err.message, 'Invalid repository property.');
        return done();
      }
      done(new Error('Expected an error'));
    });
  });
});
