import foo from './lib/foo';

export default function(msg) {
  return foo(() => msg);
}
