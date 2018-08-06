var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    plugins = require('gulp-load-plugins')(),   //加载gulp-load-plugins插件，并马上运行它
    config = require('./gulp/gulp.config'),     //引入配置文件
    version = config.version,                   //版本信息
    commons = config.commons,                   //替换路径
    uiUrl = config.uiUrl,                       //下载路径
    serverUrl = config.serverUrl,               //服务器路径
    dir = require('./gulp/gulpDir'),            //引入文件操作
    fs = require("fs"),
    cheerio = require("cheerio");

//- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
var rev = function () {
    return gulp.src(['rev/*.json',commons + "*.*","!" + commons + "**/*.png","!" + commons + "**/*.jpg","!" + commons + "**/*.gif"])
        .pipe(plugins.revCollector({
            replaceReved:true
        }))
        //.pipe(plugins.replace(/https?:\/\/.+:\d{0,5}\/V\d*\.\d*\.\d*\.?\d*\/(?:dist|src)/g, serverUrl + version + '/dist'))   //替换服务器地址、版本号
        .pipe(gulp.dest(commons));    //- 替换后的文件输出的目录
};

var addMin = function () {
    return gulp.src(["rev/*.json"])
        .pipe(plugins.replace(/\.(js|css)"/g, '.min.$1"'))   //替换服务器地址、版本号
        .pipe(gulp.dest("rev"));    //- 替换后的文件输出的目录
};

var afterDownLoad = function () {
    return plugins.runSequence(["addMin"],['rev']);
};

gulp.task('afterDownLoad',afterDownLoad);

gulp.task('addMin',addMin);

//替换
gulp.task('rev',rev);

//to src
gulp.task('toSrc',function () {
    return gulp.src([commons + "*.*","!" + commons + "**/*.png","!" + commons + "**/*.jpg","!" + commons + "**/*.gif"])
        .pipe(plugins.replace(/-.{10}\.min(\.(?:js|css)")/g, '$1'))
        .pipe(plugins.replace(/\.min(\.(?:js|css)")/g, '$1'))
        .pipe(gulp.dest(commons));
});

//to dist
gulp.task('toDist',function () {
    return gulp.src([commons + "*.*","!" + commons + "**/*.png","!" + commons + "**/*.jpg","!" + commons + "**/*.gif"])
        .pipe(plugins.replace(/(\.(?:js|css)")/g, '.min$1'))
        .pipe(gulp.dest(commons));
});

//下载
gulp.task('downLoad',function () {
    var url = uiUrl + '/'+version+'/dist/rev/',
        http = url.indexOf("https") != -1 ? require("https") : require("http"),
        ip = url.substring(url.indexOf(":") + 3,url.lastIndexOf(":")),
        port = url.split(":")[2].substring(0,url.split(":")[2].indexOf("/")),
        path = url.split(":")[2].substring(url.split(":")[2].indexOf("/")),
        options = {
            hostname: ip,
            port: port,
            path: path,
            method: 'POST',
            rejectUnauthorized:false
        };

    var req = http.request(options,function (res) {
        var html = '';
        res.on('data',function (d) {
            html += d;
        });

        res.on('end',function () {
            var $ = cheerio.load(html);
            dir.empty('rev');
            fs.rmdirSync('rev');
            fs.mkdir('rev');

            var times = 0;
            var $a = $("a");
            var allTimes = $a.length - 1;
            $a.each(function(){
                var fileName = $(this).find("tt").text();
                if(fileName == "") {
                    return true;
                }
                var eachOptions = {
                    hostname : options.hostname,
                    port : options.port,
                    method : options.method,
                    rejectUnauthorized : options.rejectUnauthorized,
                    path : options.path + fileName
                };
                var eachReq = http.request(eachOptions,function (innerRes) {
                    var content = '';

                    innerRes.on('data',function (eachContent) {
                        content += eachContent;
                    });
                    innerRes.on('end',function () {
                        fs.writeFile("rev/"+fileName,content,function (err) {
                            if(err) {
                                console.log('出现错误');
                            }
                            console.log('下载成功');
                            times ++;
                            if(times == allTimes) {
                                afterDownLoad();
                            }
                        })
                    })
                });

                eachReq.on('error',function () {
                    console.log("");
                });

                eachReq.end();
            });
        })
    });

    req.on('error',function (e) {
        console.error(e);
    });
    req.end();
});

//定义livereload任务
gulp.task('connect', function () {
    plugins.connect.server({
        host : '10.0.0.200',
        root : commons,
        port:'9999',
        livereload: true
    });
});

gulp.task('sass',function(){
    gulp.src(commons + "/src/sass/*.scss") //*表示所有的scss文件
        .pipe(plugins.concat('index.css'))
        .pipe(plugins.sass())
        .pipe(gulp.dest(commons + "/src/css"))
});

gulp.task('reload',function(){
    gulp.src(commons)
        .pipe(plugins.connect.reload());  //自动刷新
});

//监控文件变化
gulp.task('watch',function (done) {
    gulp.watch(commons + "/**",["reload"]);
    gulp.watch(commons + "/src/sass/*.scss",["sass"]);
});

//定义默认任务
gulp.task('default',['watch', 'connect']);

