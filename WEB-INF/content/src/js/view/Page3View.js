define([
    "jquery", "underscore", "backbone", "artTemplate",
    "view/CanvasView.js","collections/CanvasCollection.js",
    "text!templates/page3.html","models/Page3Model.js"
], function ($, _, Backbone,template,
             CanvasView,CanvasCollection,
             Page3Html,Page3Model
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page3Model,
        initialize: function () {
            this.$el.html(template.compile(Page3Html)(this.model.toJSON()));
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
        },
        render: function () {
            var model = this.model.toJSON();
            new CanvasView({
                el: $("#gyk_canvas_top"),
                attributes : {
                    canvas : model.canvas,
                    name : model.name
                },
                collection: new CanvasCollection(model.message)
            });
        }
    })
});
