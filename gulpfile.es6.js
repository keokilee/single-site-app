let gulp = require('gulp');
let {babel, run, rename} = require('gulp-load-plugins');

gulp.task('transpile-app', () => {
  return gulp.src('app/index.es6.js')
             .pipe(babel())
             .pipe(rename('index.js'))
             .pipe(gulp.dest('app'));
});

gulp.task('run', ['default'], () => {
  return run('electron .').exec();
});

gulp.task('default', ['transpile-app']);
