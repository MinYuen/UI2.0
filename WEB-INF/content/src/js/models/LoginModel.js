define([
    'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            "name":  "登录",
            "url" : "#index/xtsy"
        }
    });
});
