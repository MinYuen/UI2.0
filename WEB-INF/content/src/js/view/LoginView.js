define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/login.html"
], function ($, _, Backbone,template,login
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        el : $("#root"),
        render: function () {
            this.$el.html(template.compile(login)(this.model.toJSON()));
            return this;
        }
    })
});
