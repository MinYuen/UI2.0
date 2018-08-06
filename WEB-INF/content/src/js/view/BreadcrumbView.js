define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/breadcrumb.html"
], function ($, _, Backbone,template,breadcrumb
    ) {

    "use strict";

    //你的表单
    return Backbone.View.extend({
        render: function () {
            this.$el.html(template.compile(breadcrumb)(this.model.get("breadcrumb")));
            return this;
        }
    })
});
