const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const importer = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');

var csssource = "css/style.css";

const processors = [
  importer({
    glob: true,
  }),
  cssnext({features: { autoprefixer: false }}),
  autoprefixer({grid:false})
];

gulp.task('css', function () {
    return gulp.src(csssource)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch(['css/**/*.css', 'components/**/*.css'], ['css']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
