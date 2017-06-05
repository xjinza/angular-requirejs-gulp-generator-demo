'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minimist = require('minimist');

// load plugins

var	amdOptimize = require("amd-optimize"),
	concat = require('gulp-concat'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
	plumber = require('gulp-plumber'),
	replace = require('gulp-replace'),
	// rev = require('gulp-rev'),
	// revReplace = require('gulp-rev-replace'),
	runSequence = require('run-sequence'),
	uglify = require('gulp-uglify');

// parse environment
var options = minimist(process.argv.slice(2), {
	string: 'env',
	default: {
		env: 'dev'
	}
});
var project = "ybiji";
var projectDist=project+"build";
// get build options for the environment
var buildOptions;
if (options.env === 'prod') {
	buildOptions = {
		tasks: ['build'],
		dirs: [projectDist]
	};
} else {
	buildOptions = {
		tasks: [],
		dirs: [project]
	};
}

// local server utils
var runServer = function(open, callback) {
	browserSync({
		notify: false,
		port: 9000,
		open: open,
		server: true
	}, callback);
};

gulp.task('bundlejs', function () {
  return amdOptimize.src("app/app",{
    	
    	configFile :project+"/app/config.js",
    	baseUrl: project+'/'
    })
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest(projectDist+'/app'));
});

gulp.task("uglifyjs", function() {
	//JS路径操作
	gulp.src(project+"/app/**/*.js")

	.pipe(uglify())
	.pipe(gulp.dest(projectDist+'/app'))

})
gulp.task("js", function(done) {
	runSequence('bundlejs','uglifyjs',  done);

})


gulp.task("html", function() {
	//JS路径操作
	gulp.src([project+'/app/**/*.html'])
	.pipe(minifyHtml())
	.pipe(gulp.dest(projectDist+'/app'))

	gulp.src([project+'/*.html'])
	.pipe(minifyHtml())
	.pipe(gulp.dest(projectDist))

})
gulp.task("css", function() {
	//JS路径操作
	gulp.src([project+'/css/*.css'])

	.pipe(minifyCss())
	.pipe(gulp.dest(projectDist+'/css'))

})

// gulp.task('img', function() {
// 	return gulp.src(project+'/img/*')
// 		.pipe(imagemin({
// 			progressive: true,
// 			interlaced: true
// 		}))
// 		.pipe(gulp.dest(projectDist+'/img'));
// });


gulp.task('extras', function() {
	gulp.src([project+'/img/**/*'], {
			dot: true
		})
		.pipe(gulp.dest(projectDist+'/img'));

	 gulp.src([project+'/plugins/**/*'], {
			dot: true
		})
		.pipe(gulp.dest(projectDist+'/plugins'));

	 gulp.src([project+'/WEB-INF/**/*'], {
			dot: true
	 })
	.pipe(gulp.dest(projectDist+'/WEB-INF'));
});

gulp.task('clean', del.bind(null, [projectDist+'/*']));

gulp.task('serve', function(done) {

	var tasks = buildOptions.tasks.slice(0);
	tasks.push('run');

	if (options.env !== 'prod') {
		tasks.push('watch');
	}

	tasks.push(done);

	runSequence.apply(null, tasks);
});

gulp.task('run', function(done) {
	runServer(true, done);
});

gulp.task('watch', function() {
	// watch for changes
	gulp.watch([
		project+'/app/**/*.html',
		project+'/*.html',
		project+'/app/**/*.js',
		project+'/img/*',
		project+'/css/*'
	]).on('change', reload);

});


gulp.task('build', function(done) {
	runSequence('clean','html', 'css', 'js', 'extras',  done);
	
});

gulp.task('default', function(done) {
	runSequence('serve',  done);
});