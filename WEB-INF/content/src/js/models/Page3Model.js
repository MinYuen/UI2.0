define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '/run',
        initialize: function () {

        },
        defaults: {
            name : "gyk",
            width : 800 * 0.98 * 2,
            height: 600 * 0.57 * 2,
            canvas : ["XY","speed","limitSpeed","guanya"]
        }
    });
});
