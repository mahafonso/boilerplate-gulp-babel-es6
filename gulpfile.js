const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync'),
    util = require('gulp-util');

const paths = {
    scripts: 'src/scripts/**/*.js',
    webpack: 'src/scripts/*.js',
    styles: 'src/styles/**/*.scss',
    sass: 'src/styles/*.scss',
    pscripts: 'src/presentear/*.js',
    pstyles: 'src/presentear/*.scss',
};

gulp.task('styles', () => {
    return gulp.src(paths.sass)
        .pipe(plugins.sass({
            errLogToConsole: true,
            outputStyle: util.env.production ? 'compressed' : 'nested',
            includePaths: [
                paths.sass,
                'node_modules/'
            ]
        }).on('error', plugins.sass.logError))
        .pipe(postcss(util.env.production ? [
            cssnano,
            autoprefixer
        ] : []))
        .pipe(rename(file => file.basename = 'checkout6-custom.min'))
        .pipe(gulp.dest('build/files'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('presentearcss', () => {
    return gulp.src(paths.pstyles)
        .pipe(plugins.sass({
            errLogToConsole: true,
            outputStyle: util.env.production ? 'compressed' : 'nested',
            includePaths: [
                paths.sass,
                'node_modules/'
            ]
        }).on('error', plugins.sass.logError))
        .pipe(postcss(util.env.production ? [
            cssnano,
            autoprefixer
        ] : []))
        .pipe(rename(file => file.basename = 'presentear.min'))
        .pipe(gulp.dest('build/files'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src(paths.webpack)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(webpack({
            entry: path.join(__dirname, 'src/scripts/checkout6-custom.js'),
            output: {
                path: path.join(__dirname, 'build'),
                filename: 'checkout6-custom.min.js',
            },
            resolve: {
                modules: ['src/scripts', 'node_modules']
            },
            mode: 'production',
            optimization: {
                minimize: util.env.production ? true : false,
            }
        }))
        .pipe(gulp.dest('build/files'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('presentearjs', () => {
    return gulp.src(paths.webpack)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(webpack({
            entry: path.join(__dirname, 'src/presentear/presentear.js'),
            output: {
                path: path.join(__dirname, 'build'),
                filename: 'presentear.min.js',
            },
            resolve: {
                modules: ['src/presentear', 'node_modules']
            },
            mode: 'production',
            optimization: {
                minimize: util.env.production ? true : false,
            }
        }))
        .pipe(gulp.dest('build/files'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
    browserSync({
        server: {
            baseDir: './build'
        },
        files: './build/files',
        open: false
    });
    
    gulp.watch(paths.scripts, gulp.series('scripts'));
    gulp.watch(paths.styles, gulp.series('styles'));
    gulp.watch(paths.pscripts, gulp.series('presentearjs'));
    gulp.watch(paths.pstyles, gulp.series('presentearcss'));
});

gulp.task('clean', () => {
    console.log('clean');
    return gulp.src('build', { read: true, allowEmpty: true })
        .pipe(clean());
});

gulp.task('deploy', gulp.parallel('styles', 'scripts'));
gulp.task('presentear', gulp.series('presentearjs', 'presentearcss'));

gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'scripts', 'watch')));
