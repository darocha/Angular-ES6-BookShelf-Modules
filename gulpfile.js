var gulp = require('gulp'),
    server = require('gulp-express'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    rename=require('gulp-rename'),
    uglify=require('gulp-uglify'),
    clean=require('gulp-clean'),
    requirejs = require('gulp-requirejs');

gulp.task('server', function () {
    return server.run({
        file: 'app.js'
    });
});

gulp.task('bundle-commonjs-clean', function(){
    return gulp.src(['es5/commonjs'])
    .pipe(clean());
});

gulp.task('bundle-amd-clean', function(){
    return gulp.src(['es5/amd'])
    .pipe(clean());
});

gulp.task('es6-commonjs',['clean-temp'], function(){
    return gulp.src(['app/*.js','app/**/*.js'])
    .pipe(babel({
        modules:"common"
    }))
    .pipe(gulp.dest('dest/temp'));
});

gulp.task('commonjs-bundle',['bundle-commonjs-clean','es6-commonjs'], function(){
    return gulp.src(['dest/temp/bootstrap.js'])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest("es5/commonjs"));
});

gulp.task('es6-amd',['clean-temp'], function(){
    return gulp.src(['app/*.js','app/**/*.js'])
    .pipe(babel({
        modules:"amd"
    }))
    .pipe(gulp.dest('dest/temp'));
});

gulp.task('amd-bundle',['bundle-amd-clean','es6-amd'], function(done){
    return requirejs({
            name:"bootstrap",
            baseUrl:'dest/temp',
            out:'app.js'  
            })
        .pipe(uglify())
        .pipe(gulp.dest("es5/amd"));
});

gulp.task('clean-temp', function(){
    return gulp.src(['dest'])
                .pipe(clean());
});

gulp.task('amd', ['amd-bundle','server']);
gulp.task('commonjs', ['commonjs-bundle','server']);
