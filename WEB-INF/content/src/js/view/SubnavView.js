define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/subnav.html"
], function ($, _, Backbone,template,subnav
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var model = this.model.get("subnav");
            this.$el.toggleClass("hide",!model.children);
            this.$el.html(template.compile(subnav)(model));
            return this;
        }
    })
});
