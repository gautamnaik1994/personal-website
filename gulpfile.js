const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
workbox = require('workbox-build');

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
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('servel', ['sass'], function () {
    browserSync.init({
        server: "./dist",
        port: 8080
    });
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});


gulp.task('copyfiles', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
    gulp.src('./src/assets/**/*.*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('buildcss', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }, {
            errLogToConsole: true
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('src/assets/css'))
});

const dist = 'dist';

gulp.task('gsw', () => {
    return workbox.generateSW({
        globDirectory: dist,
        globPatterns: [
            '**/*.{html,js,png,ttf,svg,woff,woff2,eot,pdf,css,json}'
        ],
        swDest: `${dist}/sw.js`,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
                urlPattern: new RegExp('https://develop--gautamnaik.netlify.com'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://gautamnaik.netlify.com'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://stackoverflow.com/users/flair/2376317.png'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://ghchart.rshah.org/00ac4b/gautamnaik1994'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('/^https:\/\/fonts\.googleapis\.com/'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600,700'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://fonts.gstatic.com/s/ibmplexsans/v3/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('https://fonts.gstatic.com/s/ibmplexsans/v3/zYX9KVElMYYaJe8bpLHnCwDKjWr7AIFsdP3pBms.woff2'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('  https://cdn.jsdelivr.net/npm/jdenticon@2.1.0'),
                handler: 'staleWhileRevalidate'
            },
          
        ]

    }).then(({
        warnings
    }) => {
        // In case there are any warnings from workbox-build, log them.
        for (const warning of warnings) {
            console.warn(warning);
        }
        console.info('Service worker generation completed.');
    }).catch((error) => {
        console.warn('Service worker generation failed:', error);
    });
});

gulp.task('build', ['copyfiles', 'buildcss']);

gulp.task('default', ['serve']);