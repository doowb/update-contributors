import fs from 'fs';
import path from 'path';
import assert from 'assert';
import update from '../index';

let upd;

describe('update-contributors', function() {
  this.timeout(0);
  beforeEach(function() {
    upd = function(done) {
      return function() {
        if (process.env.CI) {
          return done();
        }
        update.apply(update, arguments);
      };
    };
  });

  it('should get contributors', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    upd(done)(pkg, (err, results) => {
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

    upd(done)(pkg, options, function(err, results) {
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
    upd(done)(pkg, function(err, results) {
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
    upd(done)(pkg, function(err, results) {
      if (err) {
        assert.equal(err.message, 'Invalid repository property.');
        return done();
      }
      done(new Error('Expected an error'));
    });
  });
});
