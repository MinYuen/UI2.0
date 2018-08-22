define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        url: '/run',
        initialize: function () {

        },
        defaults: {
            name : "gyk",
            canvas : [
                {
                    name : "top",
                    width : 800 * 0.98 * 2,
                    height: 600 * 0.58 * 2,
                    canvas : ["XY","GLB","speed","limitSpeed","text","ruler"]
                },
                {
                    name : "bottom",
                    width : 800 * 0.98 * 2,
                    height: 600 * 0.13 * 2,
                    canvas : ["xy","guanya","qianjin"]
                }
            ]
        }
    });
});
