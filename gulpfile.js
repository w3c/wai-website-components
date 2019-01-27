const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require('postcss-easy-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
var pixrem = require('gulp-pixrem');

const csssource = "css/style.css";

const processors = [
  atImport({glob: true}),
  postcssPresetEnv({
    stage: 0,
    features: {
      'nesting-rules': true,
      'custom-media-queries': true,
      'media-query-ranges': true,
      'custom-selectors': true
    },
    autoprefixer: {grid:false},
    browsers: 'last 2 version, > 1%, IE 10'
  })
];

gulp.task('css', function () {
    return gulp.src(csssource)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(pixrem({ rootValue: '16px' }))
        .pipe(cssnano({safe: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/assets/css/'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch(['css/**/*.css', 'components/**/*.css'], ['css']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
