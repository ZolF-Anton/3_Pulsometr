const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'dist', // may choose  'src' or 'dist' for ur needs
        },
    });
});

gulp.task('styles', function () {
    return gulp
        .src('src/scss/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css')) // may choose  'src' or 'dist' for ur needs
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});
gulp.task('html', function () {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});
gulp.task('iconz', function () {
    return gulp.src('src/iconz/**/*').pipe(gulp.dest('dist/iconz'));
});

gulp.task('mailer', function () {
    return gulp.src('src/mailer/**/*').pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
});
gulp.task(
    'default',
    gulp.parallel(
        'watch',
        'server',
        'styles',
        'html',
        'scripts',
        'fonts',
        'iconz',
        'mailer',
        'images'
    )
);
