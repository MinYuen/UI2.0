({
    baseUrl: "WEB-INF/content/src",

    dir: '/',
    paths: {
        "text": "vendor/requireText/js/requireText.js",
        "css": "vendor/requireCss/js/requireCss.js",
        "artTemplate": "vendor/artTemplate/js/artTemplate.js",
        "mock": "vendor/mock/js/mock.js",
        "jquery": "vendor/jquery/js/jquery.js",
        "cropper": "vendor/cropper/js/cropper.js",
        "bootstrap": "vendor/bootstrap/js/bootstrap.js",
        "backbone": "vendor/backbone/js/backbone.js",
        "underscore": "vendor/underscore/js/underscore.js",
        "bootstrap-ie8": "vendor/bootstrap/js/bootstrap-ie8.js",
        "slider": "vendor/slider/js/slider.js",
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
            deps: ["jquery", "css!vendor/cropper/css/cropper.css"]
        },
        "bootstrap": {
            deps: ["jquery", "css!vendor/bootstrap/css/bootstrap.css"]
        },
        "slider": {
            deps: ["jquery", "css!vendor/slider/css/slider.css"]
        },
        "common": {
            deps: ["bootstrap"]
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
            'view': '/src/js/view',
            'models' : '/src/js/models',
            'collection' : '/src/js/collection',
            'templates' : '/src/templates'
        }
    }
})