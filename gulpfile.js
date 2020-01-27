"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps"); //old-series
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin")
var jsmin = require("gulp-uglify");

gulp.task("css-old", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("css", function() {
  return gulp.src("source/less/style.less", { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}", {
    ignore: "source/img/icon-*.svg"
  })
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({
				plugins: [
					{removeViewBox: false}
				]
			})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 75}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("jsmin", function() {
  return gulp.src("source/js/**/*.js")
    .pipe(jsmin())
    .pipe(rename(function (path) {
      path.basename += ".min";
      // path.extname = ".md";
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
    ], {
      base: "source",
      ignore: "source/img/icon-*.svg"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "jsmin",
  "images",
  "webp",
  "sprite",
  "html"
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: false,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task("start", gulp.series("server"));
