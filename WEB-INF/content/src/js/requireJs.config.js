/**
 * Created by raven on 2018/5/4.
 */
(function (window, require) {
    //浏览器版本判断
    var userAgent = window.navigator.userAgent,
        lowIE = /Trident/.test(userAgent) && /(5|6|7|8)/.test(userAgent.match(/MSIE\s(\d+).\d+/) ? RegExp["$1"] : ""),
        requireConfig = {
            waitSeconds : 0,
            //baseUrl: "http://10.0.0.190:60081/hzcec-ui/V1.1.0/dist/",
            baseUrl: "http://10.0.0.200:8888/V1.1.0/src/",
            paths: {
                "text": "vendor/requireText/js/requireText.js",
                "css": "vendor/requireCss/js/requireCss.js",
                "artTemplate": "vendor/artTemplate/js/artTemplate.js",
                "mock": "vendor/mock/js/mock.js",
                "jquery": "vendor/jquery/js/" + (lowIE ? "jquery-ie8.js" : "jquery.js"),
                "cropper": "vendor/cropper/js/" + (lowIE ? "cropper-ie8.js" : "cropper.js"),
                "bootstrap": "vendor/bootstrap/js/bootstrap.js",
                "backbone": "vendor/backbone/js/backbone.js",
                "underscore": "vendor/underscore/js/underscore.js",
                "bootstrap-ie8": "vendor/bootstrap/js/bootstrap-ie8.js",
                "slider": "vendor/slider/js/slider.js",
                "respond": "/common/respond/respond.proxy.js",
                "common": "fog/common/js/common.js",
                "table": "fog/table/js/table.js",
                "exception": "fog/exception/js/exception.js",
                "search": "fog/search/js/search.js",
                "alert": "fog/alert/js/alert.js",
                "modal": "fog/modal/js/modal.js",
                "wordCount": "fog/wordCount/js/wordCount.js",
                "tree": "fog/tree/js/tree.js",
                "upload": "fog/upload/js/upload.js",
                "date": "fog/date/js/date.js",
                "passwordStrength": "fog/passwordStrength/js/passwordStrength.js",
                "validator": "fog/validator/js/validator.js",
                "crypto": "fog/crypto/js/crypto.js",
                "secondValidate": "fog/secondValidate/js/secondValidate.js",
                "badge": "fog/badge/js/badge.js",
                "spinner": "fog/spinner/js/spinner.js",
                "optionSelect": "fog/optionSelect/js/optionSelect.js"
            },
            shim: {
                'underscore': {
                    exports: '_'
                },
                'jquery': {
                    exports: '$'
                },
                'backbone': {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                },
                "cropper": {
                    deps: ["jquery", "css!vendor/cropper/css/" + (lowIE ? "cropper-ie8.css" : "cropper.css")]
                },
                "respond": {
                    deps: ["bootstrap-ie8"]
                },
                "bootstrap": {
                    deps: ["jquery", lowIE ? "" : "css!vendor/bootstrap/css/bootstrap.css"]
                },
                "slider": {
                    deps: ["jquery", "css!vendor/slider/css/slider.css"]
                },
                "common": {
                    deps: ["bootstrap","mock-dev"]
                },
                "tree": {
                    deps: ["common", "css!fog/tree/css/tree.css"]
                },
                "table": {
                    deps: ["common", "css!fog/table/css/table.css"]
                },
                "optionSelect": {
                    deps: ["modal", "alert", "css!fog/optionSelect/css/optionSelect.css"]
                },
                "passwordStrength": {
                    deps: ["common", "css!fog/passwordStrength/css/passwordStrength.css"]
                },
                "wordCount": {
                    deps: ["common", "css!fog/wordCount/css/wordCount.css"]
                },
                "upload": {
                    deps: ["modal", "alert", "cropper", "css!fog/upload/css/upload.css"]
                },
                "alert": {
                    deps: ["common"]
                },
                "modal": {
                    deps: ["common", "artTemplate"]
                },
                "date": {
                    deps: ["common", "css!fog/date/css/date.css"]
                },
                "badge": {
                    deps: ["common"]
                },
                "spinner": {
                    deps: ["common", "css!fog/spinner/css/spinner.css"]
                },
                "crypto": {
                    deps: ["common"],
                    exports: 'CryptoJS'
                },
                "exception": {
                    deps: ["modal"]
                },
                "search": {
                    deps: ["tree", "date"]
                },
                "secondValidate": {
                    deps: ["modal", "alert"]
                },
                "validator": {
                    deps: ["common"]
                }
            },
            map: {
                '*': {
                    'js' : '/src/js',
                    'mock-dev' : '/mock/mock-dev.js',
                    'data' : '/src/data',
                    'view': '/src/js/view',
                    'models' : '/src/js/models',
                    'collections' : '/src/js/collections',
                    'templates' : '/src/templates'
                }
            }
        },
        headCss = [
            "vendor/bootstrap/css/bootstrap.css",
            "vendor/bootstrap/html/respond-proxy.html?id=respond-proxy&rel=respond-proxy",
            "/common/respond/respond.proxy.gif?id=respond-redirect&rel=respond-redirect"
        ];

    //配置require
    require.config(requireConfig);

    //低版本IE提前在head中加载css
    lowIE ? addCssInHead() : null;

    //在head中加载css
    function addCssInHead() {
        var document = window.document,
            head = document.getElementsByTagName("head")[0],
            regbaseUrl = /^\//;
        for (var j = 0, length = headCss.length; j < length; j++) {
            var url = headCss[j];
            url = (regbaseUrl.test(url) ? "" : requireConfig.baseUrl) + url;
            head.appendChild(createElement(getAttr(url)));
        }
        require(["respond"]);
    }

    //创建
    function createElement(attr) {
        var link = document.createElement("link");
        attr.rel = attr.rel || 'stylesheet';
        for (var i in attr) {
            link[i] = attr[i];
        }
        return link;
    }

    //分解url参数
    function getAttr(url) {
        var urlArr = url.split("?"),
            attrArr = !urlArr[1] ? [] : urlArr[1].split("&"),
            i = 0, j = attrArr.length, attr = {href: urlArr[0]}, temArr;
        for (; i < j; i++) {
            temArr = attrArr[i].split("=");
            attr[temArr[0]] = temArr[1];
        }
        return attr;
    }
})(window, require);


