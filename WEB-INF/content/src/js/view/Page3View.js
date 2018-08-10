define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page3.html","models/Page3Model.js","tree"
], function ($, _, Backbone,template,
             Page3Html,Page3Model
) {

    "use strict";

    return Backbone.View.extend({
        model : new Page3Model,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(Page3Html)(this.model.toJSON()));
            $.ajax({
                url : "/run",
                success : function (reply) {
                    console.log(reply)
                }
            })
        }
    })
});
