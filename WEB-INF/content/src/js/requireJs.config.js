/**
 * Created by raven on 2018/5/4.
 */
(function (window, require) {
    //浏览器版本判断
    var userAgent = window.navigator.userAgent,
        lowIE = /Trident/.test(userAgent) && /(5|6|7|8)/.test(userAgent.match(/MSIE\s(\d+).\d+/) ? RegExp["$1"] : ""),
        requireConfig = {
            waitSeconds : 0,
            baseUrl: "http://10.0.0.190:60081/hzcec-ui/V1.1.0/dist/",
            //baseUrl: "http://localhost:8888/V1.1.0/src/",
            paths: {
                "text": "vendor/requireText/js/requireText-85ae50987d.min.js",
                "css": "vendor/requireCss/js/requireCss-5e9e869ef8.min.js",
                "mock": "vendor/mock/js/mock-2d606a442c.min.js",
                "backbone": "vendor/backbone/js/backbone-3c740deddb.min.js",
                "underscore": "vendor/underscore/js/underscore-0b026fe2d3.min.js",
                "artTemplate": "vendor/artTemplate/js/artTemplate-077d036160.min.js",
                "jquery": "vendor/jquery/js/" + (lowIE ? "jquery-ie8-c927eab723.min.js" : "jquery-bfca35fe4f.min.js"),
                "cropper": "vendor/cropper/js/" + (lowIE ? "cropper-ie8-0aaffc34c1.min.js" : "cropper-cc8b259036.min.js"),
                "bootstrap": "vendor/bootstrap/js/bootstrap-45480b3e48.min.js",
                "bootstrap-ie8": "vendor/bootstrap/js/bootstrap-ie8-398384b868.min.js",
                "slider": "vendor/slider/js/slider-8ebcb1f57f.min.js",
                "respond": "/common/respond/respond.proxy.min.js",
                "common": "fog/common/js/common-1048af9326.min.js",
                "table": "fog/table/js/table-07a87b176c.js",
                "exception": "fog/exception/js/exception-b131da08d0.min.js",
                "search": "fog/search/js/search-15b7105b7e.min.js",
                "alert": "fog/alert/js/alert-0478891064.min.js",
                "modal": "fog/modal/js/modal-05cb4d4ded.min.js",
                "wordCount": "fog/wordCount/js/wordCount-363c02a0dd.min.js",
                "tree": "fog/tree/js/tree-0e595c9d65.min.js",
                "upload": "fog/upload/js/upload-33c05cc25d.min.js",
                "date": "fog/date/js/date-2529db6dba.min.js",
                "passwordStrength": "fog/passwordStrength/js/passwordStrength-555a110694.min.js",
                "validator": "fog/validator/js/validator-87379e95cd.min.js",
                "crypto": "fog/crypto/js/crypto-e01d4e1dc1.min.js",
                "secondValidate": "fog/secondValidate/js/secondValidate-c7dacfbdd6.min.js",
                "badge": "fog/badge/js/badge-640143ef51.min.js",
                "spinner": "fog/spinner/js/spinner-e8d66fb2f7.min.js",
                "optionSelect": "fog/optionSelect/js/optionSelect-0eb5f8ad5f.min.js"
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
                    deps: ["jquery", "css!vendor/cropper/css/" + (lowIE ? "cropper-ie8-3f0d43ad32.min.css" : "cropper-d2140d5599.min.css")]
                },
                "respond": {
                    deps: ["bootstrap-ie8"]
                },
                "bootstrap": {
                    deps: ["jquery", lowIE ? "" : "css!vendor/bootstrap/css/bootstrap-4c956827f8.min.css"]
                },
                "slider": {
                    deps: ["jquery", "css!vendor/slider/css/slider-0245259d69.min.css"]
                },
                "common": {
                    deps: ["bootstrap","mock-dev"]
                },
                "tree": {
                    deps: ["common", "css!fog/tree/css/tree-e27171afba.min.css"]
                },
                "table": {
                    deps: ["common", "css!fog/table/css/table-29d5d6c8ce.min.css"]
                },
                "optionSelect": {
                    deps: ["modal", "alert", "css!fog/optionSelect/css/optionSelect-dc330381db.min.css"]
                },
                "passwordStrength": {
                    deps: ["common", "css!fog/passwordStrength/css/passwordStrength-8abd55d5f3.min.css"]
                },
                "wordCount": {
                    deps: ["common", "css!fog/wordCount/css/wordCount-f194aaefa0.min.css"]
                },
                "upload": {
                    deps: ["modal", "alert", "cropper", "css!fog/upload/css/upload-29f650b11c.min.css"]
                },
                "alert": {
                    deps: ["common"]
                },
                "modal": {
                    deps: ["common", "artTemplate"]
                },
                "date": {
                    deps: ["common", "css!fog/date/css/date-74424d1411.min.css"]
                },
                "badge": {
                    deps: ["common"]
                },
                "spinner": {
                    deps: ["common", "css!fog/spinner/css/spinner-03317360e9.min.css"]
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
            "vendor/bootstrap/css/bootstrap-4c956827f8.min.css",
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


