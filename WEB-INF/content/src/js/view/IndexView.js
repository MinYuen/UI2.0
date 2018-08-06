define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/index.html"
], function ($, _, Backbone,template,login
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        el : $("#root"),
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            //this.model.on("change", this.render, this);
        },
        render: function () {
            this.$el.html(template.compile(login)(this.model.toJSON()));
            this.$("[data-id='" + this.first + "']").addClass("active");
            return this;
        }
    })
});
