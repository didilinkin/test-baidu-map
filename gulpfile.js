var gulp = require('gulp'), 						// gulp
	util = require('gulp-util'), 					// gulp常用的工具库——gulp-util
	// JS压缩
	uglify = require('gulp-uglify'), 				// JS压缩
	pump = require('pump'),
	concat = require('gulp-concat'),				// JS合并
	rename = require('gulp-rename')					// 文件重命名
	// CSS预处理任务
	sass = require('gulp-sass'), 					// sass编译——gulp-sass
	// 图片压缩
	imagemin = require('gulp-imagemin'),			// 图片压缩
	pngquant = require('imagemin-pngquant'),		// PNG图片压缩
	// 特殊任务
	watchPath = require('gulp-watch-path'),		    // watch监控——gulp-watch-path
	connect = require('gulp-connect'),				// gulp 服务器插件
	livereload = require('gulp-livereload');		// 自动刷新——gulp-livereload


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
	gulp.task('minifyjs', function() {
        return gulp.src('src/js/*.js')      	//需要操作的文件
            // .pipe(concat('main.js'))    		//合并所有js到main.js
			.pipe(uglify())    					//压缩
			.pipe(rename({suffix: '.min'})) 	//rename压缩后的文件名
            .pipe(gulp.dest('dist/js'))       	//输出到文件夹
			// 刷新页面
			.pipe(connect.reload());
    });

	// 图片压缩
	gulp.task('imagemin',function(){
		gulp.src('./src/img/*.{png,jpg,gif,ico}')
			.pipe(imagemin({
				progressive: true,
				svgPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./dist/img/'));
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
			gulp.watch('src/js/*.js',['minifyjs']);
	});

	gulp.task('default', ['connect', 'watch'])
