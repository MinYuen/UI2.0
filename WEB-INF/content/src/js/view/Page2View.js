define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page2.html","models/Page2Model.js"
], function ($, _, Backbone,template,
             Page2Html,Page2Model
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page2Model,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(Page2Html)(this.model.toJSON()));
            return this;
        }
    })
});
