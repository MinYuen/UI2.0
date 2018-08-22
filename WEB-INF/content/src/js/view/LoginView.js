define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/login.html"
], function ($, _, Backbone,template,login
    ) {

    "use strict";

    return Backbone.View.extend({
        events : {
            "click #loginBtn" : "login"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template.compile(login)(this.model.toJSON()));
            return this;
        },
        login : function () {
            $.router.navigate('index/xtsy', {
                trigger: true
            });
        }
    })
});
