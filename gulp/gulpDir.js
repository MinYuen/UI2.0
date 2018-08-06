/**
 * Created by raven on 2018/4/20.
 */
var fs = require("fs");

var copy = function (srcDir,distDir) {
    if(!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    var files = fs.readdirSync(srcDir);//读取该文件夹
    files.forEach(function (file) {
        var stats = fs.statSync(srcDir+'/'+file);
        if(stats.isDirectory()) {
            fs.mkdirSync(distDir + '/' + file);
            copy(srcDir + '/' + file ,distDir + '/' + file);
        }
        else {
            var data = fs.readFileSync(srcDir + '/' + file);
            fs.writeFileSync(distDir + '/' + file,data);
        }
    });
};

var empty = function (fileUrl) {
    var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
            console.log("删除文件"+fileUrl+'/'+file+"成功");
        }
    });
};

module.exports = {
    copy : copy,
    empty : empty
};

