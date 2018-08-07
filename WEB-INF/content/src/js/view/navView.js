define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/nav.html"
], function ($, _, Backbone,template,nav
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        initialize: function () {
            //this.listenTo(this.model, "change", this.render);
            //this.model.on("change", this.render, this);
        },
        render: function () {
            this.$el.html(template.compile(nav)(this.model.toJSON()));
            this.$("[data-id='" + this.first + "']").addClass("active");
            return this;
        }
    })
});
