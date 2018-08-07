define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/index.html"
], function ($, _, Backbone,template,login
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(login)(this.model.toJSON()));
            return this;
        }
    })
});
