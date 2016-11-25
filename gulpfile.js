var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
//less编译为css和css的合成以及将css中兼容的样式补全(autoprefixer)
gulp.task('less',function(){
	return gulp.src(['css/*.less','view/*.less'])
	           .pipe( less() )
	           .pipe( gulp.dest('css/') );
	           
});
gulp.task('css',function(){
	return  gulp.src('css/*.css')
				.pipe( cleanCss() )
	            .pipe( autoprefixer({
	                browsers: ['last 20 versions'],
		            cascade: true
	            }))
	            .pipe( concat("indexPage.min.css"))
	            .pipe( gulp.dest('../peopleprogress/'));
});
//js文件的合并压缩
var uglify = require('gulp-uglify');//压缩js文件的工具
gulp.task('uglify',function(){
	return gulp.src(['config/indexPage.js','controller/*Controller.js'])//有顺序的放置文件,先声明再应用
	           .pipe( concat("indexPage.min.js") ) //合并js文件
	           .pipe( uglify())//压缩js文件的
	           .pipe( gulp.dest('../peopleprogress/'));
})

//本地服务器
var connect = require('gulp-connect');
gulp.task('localhost',function(){
	connect.server({
		root:'../peopleprogress/',
		port:8081
	});
});


//对less文件或者js文件的监听
gulp.task('mywatch',function(){
	gulp.watch(['css/*.less','view/*.less'],['less']);
	gulp.watch(['config/indexPage.js','controller/*.js'],['uglify']);
	gulp.watch('css/*.css',['css']);
})

gulp.task('default',['mywatch','localhost']);



//对js等文件名进行md5加密
var rev  = require('gulp-rev');
gulp.task('rev',function(){
	return gulp.src(['../peopleprogress/indexPage.min.css','../peopleprogress/indexPage.min.js'])
	           .pipe( rev() )
	           .pipe( gulp.dest('../peopleprogress/'))
	           .pipe( rev.manifest() )//用gulp-rev插件来生成静态文件版本号，然后它会把版本号写到rev-manifest.json配置文件里。
	           .pipe( gulp.dest('../peopleprogress/'));
});

//将上面的生成的加密文的文件引入到indexPage.html中
var inject = require('gulp-inject');
gulp.task('inject',function(){
	return gulp.src(['../peopleprogress/indexPage.html'])
	           .pipe( inject(gulp.src(['../peopleprogress/indexPage-*.min.css','../peopleprogress/indexPage-*.min.js']),{ignorePath:'../peopleprogress/',addRootSlash:false}))
	           .pipe( gulp.dest('../peopleprogress/'))
});
//其中加上{ignorePath:'projects/exercise/',addRootSlash:false}是因为,在将js和css注入indexPage.html中时会自动拼接路径,需要将其去除,而且去除时候,会自动加上一个"/",这时需要将addRootSlash:false,改为false后,会自动去掉"/";




//js等文件内容改变后会生成相应的app-xxxx.min.js,将原先的给删除清理掉
var clean = require('gulp-clean');
gulp.task('clean',function(){
	return gulp.src('../peopleprogress/indexPage-*.min.*')
	           .pipe( clean() )
});

//清理过程中会有顺序的问题,此时需要给这些异步操作事件进行排序执行
var sequence = require('gulp-sequence');
gulp.task('build',function( cd ){//cd回调函数不能忘
	sequence( 'clean','rev','inject',cd );
});
//这个代码写上后,直接执行 gulp build 会按clean rev inject 的顺序依次执行下来
