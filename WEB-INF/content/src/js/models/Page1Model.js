define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '',
        initialize: function () {

        },
        defaults: {
            "moduleName" : "page1",
            "name":  "page1",
            "tablehead" : [
                {'EN':'id','CH':'ID','VISIBLE':false},
                {'EN':'carState','CH':'姓名','widthstatic':'10%'},
                {'EN':'carNum','CH':'日期','widthstatic':'10%'},
                {'EN':'carTime','CH':'数字','widthstatic':'5%'},
                {'EN':'carFocus','CH':'文字','widthstatic':'25%'},
                {'EN':'carState','CH':'段落','widthstatic':'25%'},
                {'EN':'carNum','CH':'时间','widthstatic':'25%'}
            ]
        }
    });
});
