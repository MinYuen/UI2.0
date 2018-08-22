define([
    "jquery", "underscore", "backbone", "artTemplate",
    "view/LoginView.js", "models/LoginModel.js",
    "view/IndexView.js", "models/IndexModel.js",
    "view/SubnavView.js","view/navView.js",
    "view/BreadcrumbView.js",
    "view/Page1View.js" , "view/Page2View.js",
    "view/Page3View.js"
], function ($, _, Backbone,template,
             LoginView, LoginModel,
             IndexView, IndexModel,
             SubnavView,navView,
             BreadcrumbView,
             Page1View, Page2View, Page3View
) {
    var indexModel = new IndexModel();

    var Router = Backbone.Router.extend({
        routes: {
            "": "login",
            "login": "login",
            "index/:first(/:second)(/*path)": "index",
            "*error": "error"
        },
        routeIndex : {
            "xtsy" : Page1View,
            "yxjl" : Page2View,
            "runState" : Page3View
        },
        login: function () {
            this.newView("indexView","loginView",LoginView,"login",$("#root"),new LoginModel);
        },
        index: function (first, second, parm) {
            var that = this,
                options = { first : first, second : second, parm : parm},
                breadcrumb = indexModel.get("breadcrumb");

            if(!breadcrumb) {
                this.newView("loginView","indexView",IndexView,"index",$("#root"),indexModel);

                indexModel.fetch().done(function () {
                    that.navView = new navView({
                        el: $("#index_nav"),
                        model: indexModel
                    });

                    that.subnavView = new SubnavView({
                        el: $("#index_subNav"),
                        model: indexModel
                    });

                    that.breadcrumbView = new BreadcrumbView({
                        el: $("#index_breadcrumb"),
                        model: indexModel
                    });

                    that.reRender(indexModel,options);
                });
            }else {
                this.reRender(indexModel,options);
            }
        },
        reRender : function (indexModel,options) {
            indexModel.set(options);
            var breadcrumb = indexModel.get("breadcrumb").breadcrumb,
                id = breadcrumb[breadcrumb.length - 1].id;
            this.navView.render();
            this.subnavView.render();
            this.breadcrumbView.render();

            this.newView("routePage","routePage",this.routeIndex[id],id,$("#index_main"));
        },
        newView : function (emptyView,view,View,id,$page,model) {
            //清空的view，新建的view，View类，template的id，page的jq对象，model
            var html = template("index_main_children_template", {id: id}),
                $html = $(html),
                obj = {el: $html};

            this[emptyView] ? this[emptyView].remove().off() : null;
            $page.append($html);
            model ? $.extend(obj,{model: model}) : null;
            this[view] = new View(obj);
        },
        error: function () {

        }
    });

    $.router = new Router();
    Backbone.history.start();
});