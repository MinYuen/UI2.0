define([
    "jquery", "underscore", "backbone",
    "js/draw.js"
], function ($, _, Backbone,
    DrawCanvas
) {

    "use strict";

    return Backbone.View.extend({
        initialize: function () {
           this.drawCanvas = new DrawCanvas(this.attributes);
        },
        render: function () {
            this.drawCanvas.draw();
        }
    })
});
