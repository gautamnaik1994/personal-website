const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var pump = require('pump');
workbox = require('workbox-build');

var src = {
    scss: 'src/scss/**/*.scss',
    css: 'src/assets/css',
    html: 'src/*.html'
};

gulp.task('sass', function (done) {
    return gulp.src('src/scss/app.scss')
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


gulp.task('copyfiles', function (done) {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
    gulp.src(['./src/assets/**/*.*', '!./src/assets/**/*.js'])
        .pipe(gulp.dest('./dist/assets'));
    done();
});

gulp.task('buildcss', function (done) {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }, {
            errLogToConsole: true
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('src/assets/js/*.js'),
            // uglify(),
            gulp.dest('dist/assets/js')
        ],
        cb
    );
});

const dist = 'dist';

gulp.task('gsw', () => {
    return workbox.generateSW({
        globDirectory: dist,
        globPatterns: [
            '**/*.{html,js,png,ttf,svg,woff,woff2,eot,pdf,css,json,ico,xml,mp3}'
        ],
        swDest: `${dist}/sw.js`,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
                urlPattern: new RegExp('https://develop--gautamnaik.netlify.com'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('/.*\.css/'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('/.*\.js/'),
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
                urlPattern: new RegExp('/^https:\/\/fonts\.googleapis\.com\/.*/'),
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
                urlPattern: new RegExp('https://cdn.jsdelivr.net/npm/jdenticon@2.1.0'),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp('/^https:\/\/.*\.cloudfront\.net\/.*/'),
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

gulp.task('serve', gulp.series('sass', function (done) {
    browserSync.init({
        server: "./src",
        port: 8080
    });
    gulp.watch(src.scss, gulp.series('sass', function (done) {
        done()
    }));
    gulp.watch(src.html).on('change', reload);
    done()
}));

gulp.task('build', ['copyfiles', 'buildcss', 'compress']);
gulp.task('build', gulp.series('copyfiles', 'buildcss', 'compress', function (done) {
    done()
}));

// gulp.task('build', gulp.series('copyfiles', 'buildcss', function (done) {
//     done()
// }));

gulp.task('default', gulp.series('serve', function (done) {
    done()
}));