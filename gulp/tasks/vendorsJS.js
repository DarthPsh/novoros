const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  // 'node_modules/jquery/dist/jquery.min.js',
  'node_modules/lozad/dist/lozad.min.js',
  'node_modules/inputmask/dist/inputmask.min.js',
  'node_modules/inputmask/dist/bindings/inputmask.binding.js',
  'node_modules/swiper/swiper-bundle.min.js',
  // 'node_modules/lightgallery.js/dist/js/lightgallery.js',
  'node_modules/nouislider/distribute/nouislider.js',
  'node_modules/svg4everybody/dist/svg4everybody.min.js'
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
