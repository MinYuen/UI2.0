define([
    "jquery", "underscore", "backbone",
    "view/LoginView.js", "models/LoginModal.js",
    "view/IndexView.js", "models/IndexModal.js",
    "view/SubnavView.js","view/BreadcrumbView.js"
], function ($, _, Backbone,
             LoginView, LoginModal,
             IndexView, IndexModal,
             SubnavView,BreadcrumbView
) {
    return {
        initialize: function () {
            var Router = Backbone.Router.extend({
                routes: {
                    "": "login",
                    "login": "login",
                    "index/:first(/:second)(/*path)": "index",
                    "*error": "error"
                },
                login: function () {
                    var login = new LoginView({
                        model: new LoginModal()
                    });
                    login.render();
                },
                index: function (first, second, parm) {
                    var indexModal = new IndexModal();
                    indexModal.set({
                        first : first,
                        second : second,
                        parm : parm
                    });
                    var indexView = new IndexView({
                        model: indexModal
                    });
                    indexModal.fetch().done(function () {
                        var subnavView = new SubnavView({
                            el : $("#index_subNav"),
                            model: indexModal
                        });
                        subnavView.render();
                        var breadcrumbView = new BreadcrumbView({
                            el : $("#index_breadcrumb"),
                            model: indexModal
                        });
                        breadcrumbView.render();
                    });
                    indexModal.changeNavbar();
                    indexView.render();
                },
                error: function () {

                }
            });

            new Router();
            Backbone.history.start();
        }
    }
});
