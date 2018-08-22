define([
    "jquery", "underscore", "backbone",
    "js/draw.js"
], function ($, _, Backbone,
    DrawCanvas
) {

    "use strict";

    return Backbone.View.extend({
        events : {
            "mousedown" : "toggle"
        },
        initialize: function () {
            this.drawCanvas = new DrawCanvas($.extend({},this.attributes,{
                space : this.collection.space
            }));
            this.time = this.collection.getTimeNumber(0);
            this.start = true;
            this.startTimeInterval();
        },
        render: function () {
            this.drawCanvas.draw(this.collection.getSomeTime(this.time));
            this.time += 5000;
        },
        startTimeInterval : function () {
            var that = this;
            that.render();
            this.timeInterval = setInterval(function () {
                that.render();
            },100)
        },
        toggle : function () {
            if(this.start) {
                clearInterval(this.timeInterval);
            }else{
                this.startTimeInterval();
            }
            this.start = !this.start;
        }
    })
});
