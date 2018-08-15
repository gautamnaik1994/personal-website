const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var src = {
    scss: 'src/scss/*.scss',
    css: 'src/assets/css',
    html: 'src/*.html'
};

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src",
        port: 8080
    });
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: 'map'
        }, {
            errLogToConsole: true
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('copyfiles', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('buildcss', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }, {
            errLogToConsole: true
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('build', ['buildcss', 'copyfiles']);

gulp.task('default', ['serve']);
