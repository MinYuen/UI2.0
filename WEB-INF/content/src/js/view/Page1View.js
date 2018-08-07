define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page1.html","models/Page1Model.js"
], function ($, _, Backbone,template,
             Page1Html,Page1Model
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page1Model,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(Page1Html)(this.model.toJSON()));
            return this;
        }
    })
});
