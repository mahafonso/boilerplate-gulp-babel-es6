const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync'),
    util = require('gulp-util');

const paths = {
    html: './src/*.html',
    scripts: 'src/scripts/**/*.js',
    webpack: 'src/scripts/*.js',
    styles: 'src/styles/**/*.scss',
    sass: 'src/styles/*.scss'
};

gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

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
        .pipe(gulp.dest('build/styles'))
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
        .pipe(gulp.dest('build/scripts'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('connect', () => {
    connect.server({
		root: 'build',
		open: false,
		port: 8000,
		livereload: true
	}, () => {
		browserSync({
          proxy: '127.0.0.1:8000',
          open: true
		});
	  })
});

gulp.task('watch', () => {
    gulp.watch(paths.styles, gulp.series('html'));
    gulp.watch(paths.styles, gulp.series('styles'));
    gulp.watch(paths.scripts, gulp.series('scripts'));
});

gulp.task('clean', () => {
    console.log('clean');
    return gulp.src('build', { read: true, allowEmpty: true })
        .pipe(clean());
});

gulp.task('deploy', gulp.parallel('styles', 'scripts'));

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'connect', 'watch')));
