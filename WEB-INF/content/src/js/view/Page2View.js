define([
    "jquery", "underscore", "backbone", "artTemplate",
    "text!templates/page2.html","models/Page2Model.js","tree"
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
            this.activeTree();
        },
        activeTree : function () {
            $("#page2_tree").treeview({
                url: "/page2",
                rootId: 0
            })
        }
    })
});
