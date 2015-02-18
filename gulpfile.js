gulp = require('gulp');
mocha = require('gulp-mocha');

gulp.task('watch', function() {
  gulp.watch(
    ['index.js', 'test/*.js'],
    ['mocha']
  );
});

gulp.task('mocha', function() {
  return gulp.src('test/*.spec.js')
    .pipe(mocha());
});

gulp.task('default', ['mocha', 'watch']);
