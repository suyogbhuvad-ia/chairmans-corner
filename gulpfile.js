const {src, gulp, dest,watch} = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');


//compileSass.compiler =require('node-sass');


function scssToCss() {
    return src('./assets/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(postcss([ autoprefixer({casecade:true}) ]))
        .pipe(minifyCss())          // for minify css if you don't want comment this line
        .pipe(sourceMaps.write())
        .pipe(concat('bundle.css')) // for bundling all css. if you don't want comment this line
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}
function scssToCssOptimized() {
  return src('./assets/scss/**/*.scss')
     // .pipe(sourceMaps.init())
      .pipe(compileSass().on('error', compileSass.logError))
      .pipe(postcss([ autoprefixer({casecade:true}) ]))
      .pipe(minifyCss())          // for minify css if you don't want comment this line
     // .pipe(sourceMaps.write())
      .pipe(concat('bundleOptimized.css')) // for bundling all css. if you don't want comment this line
      .pipe(dest('./dist/css/'))
      .pipe(browserSync.stream());
}

function mergedCustomJs() {
  return src('./assets/js/**/*.js')
    .pipe(sourceMaps.init())
    .pipe(minifyJs())
    .pipe(sourceMaps.write())
    .pipe(concat('customJsbundle.js'))
    .pipe(dest('./dist/js/'))
}
function mergedCustomJsOptimized() {
  return src('./assets/js/**/*.js')
    //.pipe(sourceMaps.init())
    .pipe(minifyJs())
   // .pipe(sourceMaps.write())
    .pipe(concat('customJsbundleOptimized.js'))
    .pipe(dest('./dist/js/'))
}

function mergedPluginJs() {
  return src('./dist/js/plugin/*.js')
    .pipe(concat('pluginBundle.js'))
    .pipe(dest('./dist/js/'))
}

function iconSprite() {
      // More complex configuration example
  config = {
    shape: {
      dimension: { // Set maximum dimensions
        maxWidth: 32,
        maxHeight: 32
      },
      spacing: { // Add padding
        padding: 10
      },
     // dest: 'out/intermediate-svg' // Keep the intermediate files
    },
    mode: {
      view: { // Activate the «view» mode
        dest: "./",
        sprite:"./images/sprite/sprite.svg",
        bust: false,
        render: {
          scss: true // Activate Sass output (with default options)
        }
      },
      symbol: false, // Activate the «symbol» mode
    }
  };
 
return src('**/*.svg', { cwd: './assets/icon' })
  .pipe(svgSprite(config))
  .pipe(dest('css'));
  

}

function pngIconSprite() {


  var spriteData= src('./assets/images/icon/**/*.png')
    .pipe(spritesmith({
      imgName:'sprite-png.png',
      cssName:'_spritePng.scss'
    }));
    

    // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    //.pipe(buffer())
   // .pipe(imagemin())
    .pipe(dest('./images/sprite/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(dest('./assets/scss/var/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);

}


function start()
{
    browserSync.init({
        server: {
            baseDir:'./'
        }
    });
    watch('./assets/scss/**/*.scss', scssToCss);
    watch('./assets/scss/**/*.scss', scssToCssOptimized);
    watch('./assets/js/**/*.js', mergedCustomJs);
    watch('./assets/js/**/*.js', mergedCustomJsOptimized);
    watch('./dist/js/plugin/*.js',mergedPluginJs);
    watch('./*.html').on('change', browserSync.reload);
}

//=====================================

exports.scssToCss = scssToCss;
exports.scssToCssOptimized = scssToCssOptimized;
exports.iconSprite = iconSprite;
exports.pngIconSprite = pngIconSprite;
exports.mergedCustomJs =mergedCustomJs;
exports.mergedCustomJsOptimized = mergedCustomJsOptimized;
exports.mergedPluginJs = mergedPluginJs;


exports.start = start;

//=====================================