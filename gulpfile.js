var _ = require('lodash');
var path = require('path');
var del = require('del');
var streamqueue = require('streamqueue');

var gulp = require('gulp');
var concat = require('gulp-concat');

var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyHtml = require("gulp-htmlmin");

//var distBasePath = '../quick-server/src/main/resources/static';
var distBasePath = 'dist';
var distPaths = {
    basePath: distBasePath,
    jsPath: path.join(distBasePath, 'js'),
    cssPath: path.join(distBasePath, 'css'),
    fontPath: path.join(distBasePath, 'fonts'),
    imgPath: path.join(distBasePath, 'images')
};
var srcBasePath = 'src';
var srcPaths = {
    basePath: srcBasePath,
    jsPath: path.join(srcBasePath, 'js'),
    cssPath: path.join(srcBasePath, 'css'),
    fontPath: path.join(srcBasePath, 'fonts'),
    imgPath: path.join(srcBasePath, 'images')
};
var libPath = 'bower_components';

gulp.task('dev', ['dev:templates', 'dev:lib-js', 'dev:app-js',
    'static-css', 'static-fonts', 'static-images', 'main-htmls'],
    function () {

    gulp.watch(path.join(srcPaths.jsPath, '/**/*.js'), ['dev:app-js']);

    gulp.watch(path.join(srcPaths.jsPath, '/**/*.html'), ['dev:app-js']);

    gulp.watch(path.join(srcPaths.imgPath, '/**/*.*'), ['static-images']);

    gulp.watch(path.join(srcPaths.cssPath, '/**/*.*'), ['static-css']);

    gulp.watch(path.join(srcPaths.basePath, '*.html'), ['main-htmls']);
});

/*=========================== CLEAN ===========================*/
//clean 任务单独执行，一般用不到
gulp.task('clean', function (cb) {
    del([distPaths.basePath], cb);
});


/*=========================== JS & Template ===========================*/
//将依赖的第三方js库合并成lib.js后放入dist目录
gulp.task('dev:lib-js', function () {
    var jsLib = _.map([
        'lodash/lodash.js',
        'Chart.js/Chart.js',

        //NG-libs
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'restangular/dist/restangular.js',
        'angular-chart.js/dist/angular-chart.js',
        'ng-dialog/js/ngDialog.js'
    ], function (sPath) {
        return path.join(libPath, sPath);
    });

    return gulp.src(jsLib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(distPaths.jsPath));
});
gulp.task('prod:lib-js', function () {
    var jsLib = _.map([
        'lodash/lodash.js',
        'Chart.js/Chart.js'
    ], function(sPath) {
        return path.join(libPath, sPath);
    });

    var ngJsLib = _.map([
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'restangular/dist/restangular.js',
        'angular-chart.js/dist/angular-chart.js',
        'ng-dialog/js/ngDialog.js'
    ], function(sPath) {
        return path.join(libPath, sPath);
    });

    var stream = streamqueue({ objectMode: true });
    stream.queue(gulp.src(jsLib));
    stream.queue(gulp.src(ngJsLib).pipe(ngAnnotate()));

    return stream.done()
        .pipe(uglify())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(distPaths.jsPath));

});

//将angular的所有template html转成js并且合并后放到dist目录下
gulp.task('dev:templates', function () {
    return gulp.src(path.join(srcPaths.jsPath, '/**/*.html'))
        .pipe(templateCache({
            module: 'module.templates',
            standalone: true,
            base: function (templateFile) {
                return path.basename(templateFile.path);
            },
            filename: 'app.tmpl'
        }))
        .pipe(gulp.dest(distPaths.jsPath));
});
gulp.task('prod:templates', function() {
    return gulp.src(path.join(srcPaths.jsPath, '/**/*.html'))
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            module: 'module.templates',
            standalone: true,
            base: function (templateFile) {
                return path.basename(templateFile.path);
            },
            filename: 'app.tmpl'
        }))
        .pipe(gulp.dest(distPaths.jsPath));
});

//将app自己的js文件合并成app.js后放入dist目录
gulp.task('dev:app-js', ['dev:templates'], function () {
    var files = [
        path.join(srcPaths.jsPath, '/**/*.js'),
        path.join(distPaths.jsPath, '*.tmpl')
    ];

    return gulp.src(files)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(distPaths.jsPath))
});
gulp.task('prod:app-js', ['prod:templates'], function () {
    var files = [
        path.join(srcPaths.jsPath, '/**/*.js'),
        path.join(distPaths.jsPath, '*.tmpl')
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(distPaths.jsPath))
});


/*=========================== CSS & LESS & SASS ===========================*/
//将依赖的第三方css文件放入dist目录下
gulp.task('static-css', function () {
    var cssLib = _.map([
        'bootstrap/dist/css/bootstrap.min.css',
        'ng-dialog/css/ngDialog.min.css',
        'ng-dialog/css/ngDialog-theme-default.min.css'
    ], function (sPath) {
        return path.join(libPath, sPath);
    });
    cssLib.push(path.join(srcPaths.cssPath, 'app.css'));

    return gulp.src(cssLib)
        .pipe(gulp.dest(distPaths.cssPath));
});


/*=========================== IMAGES & FONTS & HTML ===========================*/
//将图片文件放入dist目录下
gulp.task('static-images', function () {
    return gulp.src(path.join(srcPaths.imgPath, '*'))
        .pipe(gulp.dest(distPaths.imgPath));
});

//将字体文件放入dist目录下
gulp.task('static-fonts', function () {
    return gulp.src(path.join(libPath, 'bootstrap/dist/fonts/*'))
        .pipe(gulp.dest(distPaths.fontPath));
});

//将main html放入dist目录下
gulp.task('main-htmls', function () {
    return gulp.src(path.join(srcPaths.basePath, '*.html'))
        .pipe(gulp.dest(distPaths.basePath));
});



/*=========================== Production Deployment ===========================*/
gulp.task('prod', ['prod:templates', 'prod:lib-js', 'prod:app-js',
    'static-css', 'static-fonts', 'static-images', 'main-htmls'],
    function () {

});

/*=========================== Default will run dev ===========================*/
gulp.task('default', ['dev']);