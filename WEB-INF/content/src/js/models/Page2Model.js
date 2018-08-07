define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '',
        initialize: function () {

        },
        defaults: {
            "name":  "page2"
        }
    });
});
