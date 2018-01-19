// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var concat = require('gulp-concat');

gulp.task('copy', function () {
    
    gulp.src(['node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/*'])
        .pipe(gulp.dest('./assets/scss/bootstrap'));
            
    //gulp.src('node_modules/bootstrap-sass/assets/stylesheets', {base:"."}).pipe(gulp.dest('./assets/scss'));
    
    gulp.src('node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
        .pipe(gulp.dest('./assets/scss/'));
    
    gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
        .pipe(gulp.dest('./assets/js/bootstrap'));
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./assets/js/jquery')).pipe(gulp.dest('./dist/js/'));
    
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('assets/images/sprite/*.png').pipe(spritesmith({
      imgName: '_sprite.png',
      cssName: '_sprite.scss',
      //cssTemplate: 'handlebarsInheritance.scss.handlebars'
    }));
    //return spriteData.pipe(gulp.dest('./dist/images/'));
    
    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    //.pipe(buffer())
    //.pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest('./assets/scss/'));
    
    
  });

gulp.task('sass', function() {
    gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
        /*
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
        */
});

gulp.task('scripts', function() {
    gulp.src([
        './assets/js/jquery/jquery.min.js', 
        './assets/js/bootstrap/bootstrap.min.js', 
        './assets/js/app.js'
    ])
      .pipe(concat('app.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('./dist/js/'))
  });


gulp.task('default', ['sass','scripts'], function() {
    gulp.watch('*.scss', ['sass']);
    gulp.watch('./assets/js/app.js', ['scripts']);
})