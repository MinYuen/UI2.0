define([
    "jquery", "underscore", "backbone",
    "js/draw.js"
], function ($, _, Backbone,
    DrawCanvas
) {

    "use strict";

    return Backbone.View.extend({
        initialize: function () {
            var that = this;
            this.drawCanvas = new DrawCanvas($.extend({},this.attributes,{
                space : this.collection.space
            }));
            this.drawCanvas.draw(this.collection.getSomeTime(this.collection.getTimeNumber(0)));
            setInterval(function () {
                that.render();
            },500)
        },
        render: function () {
            this.drawCanvas.draw(this.collection.toJSON());
        }
    })
});
