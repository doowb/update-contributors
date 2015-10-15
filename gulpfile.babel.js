import gulp from 'gulp';
import webpack from 'webpack';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import babel from 'babel/register';
import istanbul from 'gulp-istanbul';
import {Instrumenter} from 'isparta';
import webpackConfig from './webpack.config';
import eslintConfig from 'open-eslint-config';
import formatter from 'eslint-friendly-formatter';

const lint = ['index.js', 'gulpfile.babel.js', 'lib/**/*.js'];

gulp.task('coverage', ['lint'], () => {
  return gulp.src(lint.concat(['!gulpfile.babel.js']))
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], () => {
  return gulp.src('test/*.js')
    .pipe(mocha({
      reporter: 'spec',
      compilers: { js: babel }
    }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.writeReports({
      reporters: [ 'text' ],
      reportOpts: {dir: 'coverage', file: 'summary.txt'}
    }));
});

gulp.task('lint', () => {
  let {rules} = eslintConfig({isDev: true, lintEnv: 'build', react: false});
  return gulp.src(lint.concat(['test/*.js']))
    .pipe(eslint({rules, configFile: './eslint-config.json'}))
    .pipe(eslint.format(formatter));
});

gulp.task('build', (cb) => {
  webpack(webpackConfig)
    .run((err, stats) => {
      if (err) {
        console.error(err);
        return cb(err);
      }
      console.log(stats.toString());
      cb();
    });
});

gulp.task('default', ['test']);
