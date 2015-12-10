// TODO: figure out ngrok base folder issue
// TPOD: the pizza page will not be started by browser sync; there's no pizza.html

var gulp = require('gulp'),
    del = require('del'),
    open = require('gulp-open'),
    browserSync = require('browser-sync').create(),
    ngrok = require('ngrok'),
    psi = require('psi'),
    sequence = require('run-sequence'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization');

var site = '',
    portVal = 8000,
    pizzaPortVal = 8001;

// Browser-sync configs

gulp.task('index', function() {
    browserSync.init({
        port: portVal,
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

/*gulp.task('pizza', function() {
    browserSync.init({
        port: pizzaPortVal,
        open: false,
        server: {
            baseDir: 'dist/views',
        }
    });
});*/

// All subtasks for printing Google PageSpeed Index scores

gulp.task('ngrok-url', function(cb) {
    return ngrok.connect(portVal, function(err, url) {
        site = url;
        console.log('serving your tunnel from: ' + site);
        cb();
    });
});

// TODO: cb, what the hell? Figure out how gulp deals with callbacks
gulp.task('psi-mobile', function(cb) {
    return psi.output(site, {
        nokey: 'true',
        strategy: 'mobile'
    });
});

gulp.task('psi-desktop', function(cb) {
    return psi.output(site, {
        nokey: 'true',
        strategy: 'desktop'
    });
});

// Print PSI
gulp.task('psi-seq', function(cb) {
    console.log('It will take 1.5mins to run Google Speed Test!');
    return sequence(
        'index',
        'ngrok-url',
        'psi-mobile',
        'psi-desktop',
        cb
    );
});


gulp.task('psi', ['psi-seq'], function() {
    return process.exit();
});

// All minification tasks

gulp.task('contents', function() {
    return gulp.src('app/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('app/**/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src('app/**/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function() {
    return gulp.src('app/**/img/**/*')
        .pipe(imageop())
        .pipe(gulp.dest('dist'));
});

// Delete the distribution folder and then build

// TODO: If there's really no need to rebuild img folders. Fix that '!dist/**/img' issue
gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build', function() {
    return sequence('clean', ['contents', 'styles', 'scripts', 'img']);
});

// Show psi in the terminal, open both index.html and pizza.html in the browser

gulp.task('open-index', function() {
    return gulp.src('')
        .pipe(open({
            uri: 'http://localhost:' + portVal
        }));
});

gulp.task('open-pizza', function() {
    return gulp.src('')
        .pipe(open({
            uri: 'http://localhost:' + portVal + '/views/pizza.html'
        }));
});

gulp.task('open-external-url', function() {
    return gulp.src('')
        .pipe(open({
            uri: site
        }));
});

gulp.task('serve', function() {
    return sequence(
        'build',
        'psi-seq',
        ['open-index', 'open-pizza', 'open-external-url']
    );
});

// TODO: with watch, write dynamic editting for index and pizza