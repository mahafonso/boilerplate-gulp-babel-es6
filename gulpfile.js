const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync'),
    util = require('gulp-util');

const paths = {
    scripts: 'src/scripts/**/*.js',
    webpack: 'src/scripts/*.js',
    styles: 'src/styles/*.scss',
    extras: 'src/*.*'
};

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(plugins.sass({
            errLogToConsole: true,
            outputStyle: util.env.production ? 'compressed' : 'nested',
            includePaths: [
                paths.styles,
                'node_modules/'
            ]
        }).on('error', plugins.sass.logError))
        .pipe(postcss(util.env.production ? [
            cssnano,
            autoprefixer
        ] : []))
        .pipe(rename(file => file.basename = 'styles.min'))
        .pipe(gulp.dest('build/files'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src(paths.webpack)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(webpack({
            entry: path.join(__dirname, 'src/scripts/app.js'),
            output: {
                path: path.join(__dirname, 'build'),
                filename: 'app.min.js',
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

gulp.task('extras', () => {
	return gulp.src(paths.extras)
		.pipe(gulp.dest('build'));
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
    gulp.watch(paths.styles, gulp.series('extras'));
});

gulp.task('deploy', gulp.series('styles', 'scripts'));

gulp.task('default', gulp.series('styles', 'scripts', 'extras', 'watch'));