var gulp = require('gulp'), 											// gulp
		util = require('gulp-util'), 									// gulp常用的工具库——gulp-util
		// JS压缩
		uglify = require('gulp-uglify'), 							// JS压缩
		pump = require('pump'),
		// CSS预处理任务
		sass = require('gulp-sass'), 									// sass编译——gulp-sass
		// 特殊任务
		watchPath = require('gulp-watch-path'),		    // watch监控——gulp-watch-path
		connect = require('gulp-connect'),						// gulp 服务器插件
		livereload = require('gulp-livereload');			// 自动刷新——gulp-livereload


  // HTML
	gulp.task('html', function () {
		gulp.src('./src/*.html')
			// 输出位置
			.pipe(gulp.dest('./dist'))
			.pipe(connect.reload());
	});

  // Sass编译任务
	gulp.task('sass', function () {
		return gulp.src('./src/sass/*.sass')
			// 输出格式 + 错误输出
			.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
			// 输出位置
			.pipe(gulp.dest('./dist/css'))
			// 添加LiveReload插件
			.pipe(connect.reload());
	});

	// JS清理
	gulp.task('minJs', function (cb) {
		pump([
					gulp.src('./src/js/*.js'),
					uglify(),
					gulp.dest('./dist/js')
			],
			cb
		);
		connect.reload();
	});

	//Gulp sever服务器
	gulp.task('connect', function() {
		connect.server({
			root: 'dist/',
			livereload: true
		});
	});



	// 在命令行使用 gulp watch 启动此任务
	gulp.task('watch', function() {
	    // 监听Sass文件修改，当文件被修改则执行 sass 任务
	    gulp.watch('src/sass/*.sass', ['sass']);
			// 监听HTML文件修改，当HTML文件被修改则执行 HTML 任务
			gulp.watch('src/*.html', ['html']);
			// 监听js文件修改，当JS文件被修改则执行 JS 任务
			gulp.watch('src/js/*.js',['minJs']);
	});

	gulp.task('default', ['connect', 'watch'])
