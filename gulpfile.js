const gulp = require('gulp');// помещаем галп в константу галп
const pug = require('gulp-pug');// паг в константу паг, чтобы дальше их вызывать

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var fontgen = require('gulp-fontgen');

const del  = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');


// все пути вынести в один объект, чтобы можно было быстро их менять
const paths = {
    root: './build', // корень проэкта
    templates: {// шаблоны
        pages: 'src/templates/pages/*.pug', // все странички
        src: 'src/templates/**/*.pug', // все исходники
        // dest: 'build/assets'//куда будет складываться
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/' 
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))// красивые отступы
        .pipe(gulp.dest(paths.root));// куда положить
}

// функция работы со стилями
function styles() {
    return gulp.src('./src/styles/app.scss')// исходная точка
        .pipe(sourcemaps.init())
        .pipe( autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe( gulp.dest('dist/js'))
        .pipe(sass({ outputStyle: 'compressed' }))// компиляция
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))// не обязательно
        .pipe(gulp.dest(paths.styles.dest));// куда положить
}

// генерация шрифтов
function fontgen() {
    return gulp.src('src/fonts/*.{ttf,otf}')
        .pipe(fontgen({
            dest: 'build/assets/fonts'
        }));
}

// автопреффиксер
function autoprefixer() {
    return gulp.src('./src/styles/app.scss')
}

// очистка
function clean() {
    return del(paths.root);// удалять в корне, папка билд
}

// webpack
function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// слежение - галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}



exports.templates = templates;
exports.styles = styles;
exports.clean = clean;// удаление
exports.images = images;// сжатие картинок
exports.fontgen = fontgen;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, autoprefixer, templates, images, scripts, fontgen),
    gulp.parallel(watch, server)
));