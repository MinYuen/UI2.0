define([
    'jquery', 'underscore', 'backbone',
    "text!data/index_data.json"
], function ($, _, Backbone, indexData) {
    return Backbone.Model.extend({
        url: '/index',
        initialize: function () {
            this.on("change", this.changeNav , this);
            this.on("change", this.changeNavbar , this);
        },
        defaults: JSON.parse(indexData),
        changeNav : function () {
            //权限
            var index = "#index/",
                nav = this.get('nav'),
                navbar = this.get('navbar'),
                first = this.get("first"),
                second = this.get("second"),
                breadcrumb = [];
            for(var i in navbar){
                if(nav[i]) {
                    navbar[i].show = true;
                    var url = "";
                    if(i === first) {
                        breadcrumb.push({
                            id: i,
                            url: index + i,
                            text: navbar[i].text
                        });
                    }
                    if(typeof nav[i] === 'object'){
                        var x = 0;
                        for(var j in nav[i]){
                            if(x === 0) {
                                url = index + i + "/" + j;
                            }
                            x++;

                            if(j === second) {
                                navbar[i].children[j].active = true;
                                breadcrumb.push({
                                    id: j,
                                    url: index + i + '/' + j,
                                    text: navbar[i].children[j].text
                                });
                            }

                            if(nav[i][j]) {
                                navbar[i].children[j].show = true;
                                navbar[i].children[j].url = index + i + '/' + j;
                            }
                        }
                    }else{
                        url = index + i;
                    }
                    navbar[i].url = url;
                }
            }
            this.set({
                navbar : navbar,
                subnav : navbar[first],
                breadcrumb : {
                    breadcrumb : breadcrumb
                }
            });
        },
        changeNavbar : function () {
            //active
            var navbar = this.get("navbar");
            var first = this.get("first");
            for(var i in navbar){
                navbar[i].active = (i === first);
            }
            this.set("navbar",navbar);
        }
    });
});
