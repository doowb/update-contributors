import fs from 'fs';
import path from 'path';
import assert from 'assert';
import update from '../index';

describe('update-contributors', function() {
  this.timeout(0);

  it('should get contributors', function(done) {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/composer-package.json')));
    update(pkg, (err, results) => {
      if (err) return done(err);
      assert(results);
      assert(Array.isArray(results.contributors));
      assert(results.contributors.length > 0);
      done();
    });
  });
});
