var gulp = require('gulp');

var browserSync = require('browser-sync');

gulp.task('index', function() {
	browserSync({
		port: 8000,
		server: {
			baseDir: './'
		}
	});
});

gulp.task('pizza', function() {
	browserSync({
		port: 8001,
		server: {
			baseDir: 'views'
		}
	});
});
