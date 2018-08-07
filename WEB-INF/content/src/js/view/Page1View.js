define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page1.html","models/Page1Modal.js"
], function ($, _, Backbone,template,
             Page1Html,Page1Modal
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page1Modal,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(Page1Html)(this.model.toJSON()));
            return this;
        }
    })
});
