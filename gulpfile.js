"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var cleancss = require("gulp-clean-css");
var util = require("gulp-util");
var uglify = require("gulp-uglify");

gulp.task("sass", function() {
	return gulp.src("./public/**/*.scss")
		.pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
		/*.pipe(autoprefixer({
			browsers: ["ie >= 8", "Chrome >= 50"]
		}))*/
		.pipe(gulp.dest("./public"))
		.pipe(rename({suffix: ".min"}))
		.pipe(cleancss())
		.pipe(gulp.dest("./public"));
});

gulp.task("scripts", function() {
	return gulp.src(["./public/**/*.js", "!./public/**/*.min.js"])
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest("./public"));
});

gulp.task("default", function() {
	util.log(util.colors.green("Watching scss and js files for modifications"));
	gulp.watch("./public/**/*.scss", ["sass"]);
	gulp.watch("./public/**/*.js", ["scripts"]);
});