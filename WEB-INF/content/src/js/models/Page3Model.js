define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '/run',
        initialize: function () {

        },
        defaults: {
            name : "gyk",
            canvas : ["XY","speed","limitSpeed","guanya"]
        }
    });
});
