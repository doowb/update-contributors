
import assert from 'assert';
import app from '../index';

describe('cyborg', () => {
  it('should pass a test', () => {
    assert.equal(app('bar'), 'foo bar');
  });
});
