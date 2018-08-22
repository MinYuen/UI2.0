define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '',
        initialize: function () {

        },
        defaults: {
            "moduleName" : "page2",
            "name":  "page2"
        }
    });
});
