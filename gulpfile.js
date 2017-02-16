const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
  gulp.watch('src/**/*.js', ['es6']);
});
