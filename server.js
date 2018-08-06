/**
 * Created by raven on 2018/4/11.
 *
 * 命令node server.js
 *
 *  http://localhost:8888/V1.1.0/src/FogUI/common/js/common.js
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.redirect('/index/index.html');
});
app.use(express.static('WEB-INF/content'));
var server = app.listen(9999, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});