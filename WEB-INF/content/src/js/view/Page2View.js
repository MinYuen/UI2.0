define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page2.html","models/Page2Modal.js"
], function ($, _, Backbone,template,
             Page2Html,Page2Modal
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page2Modal,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(Page2Html)(this.model.toJSON()));
            return this;
        }
    })
});
