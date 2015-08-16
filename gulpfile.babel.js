import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

let {babel, run, rename, jsxcs} = plugins();

gulp.task('compile:js', ['jscs'], () => {
  return gulp.src('app/scripts/index.es6.js')
             .pipe(babel())
             .pipe(rename('index.js'))
             .pipe(gulp.dest('app'));
});

gulp.task('jscs', () => {
  return gulp.src(['app/scripts/*', 'browser/scripts/*'])
             .pipe(jsxcs({
               preset: "node-style-guide",
               esnext: true
             }));
});

gulp.task('run', ['default'], () => {
  return run('electron .').exec();
});

gulp.task('default', ['compile:js']);
