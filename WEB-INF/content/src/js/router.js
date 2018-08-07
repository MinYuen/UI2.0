define([
    "jquery", "underscore", "backbone", "artTemplate",
    "view/LoginView.js", "models/LoginModal.js",
    "view/IndexView.js", "models/IndexModal.js",
    "view/SubnavView.js","view/BreadcrumbView.js",
    "view/Page1View.js" , "view/Page2View.js"
], function ($, _, Backbone,template,
             LoginView, LoginModal,
             IndexView, IndexModal,
             SubnavView,BreadcrumbView,
             Page1View, Page2View
) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "login",
            "login": "login",
            "index/:first(/:second)(/*path)": "index",
            "*error": "error"
        },
        routeIndex : {
            "xtsy" : Page1View,
            "yxjl" : Page2View
        },
        login: function () {
            new LoginView({
                model: new LoginModal()
            });
        },
        index: function (first, second, parm) {
            var that = this,
                indexModal = new IndexModal(),
                options = {
                    first : first,
                    second : second,
                    parm : parm
                };
            indexModal.set(options);
            new IndexView({
                model: indexModal
            });
            indexModal.fetch().done(function () {
                var breadcrumb = indexModal.get("breadcrumb").breadcrumb,
                    id = breadcrumb[breadcrumb.length - 1].id;

                new SubnavView({
                    el: $("#index_subNav"),
                    model: indexModal
                });

                new BreadcrumbView({
                    el: $("#index_breadcrumb"),
                    model: indexModal
                });

                new that.routeIndex[id]({
                    el: $("#index_main")
                });
            });
            indexModal.changeNavbar();
        },
        error: function () {

        }
    });

    $.router = new Router();
    Backbone.history.start();
});