define(["jquery","underscore","backbone","artTemplate","text!templates/login.html"],function(e,t,n,r,i){"use strict";return n.View.extend({el:e("#root"),render:function(){return this.$el.html(r.compile(i)(this.model.toJSON())),this}})});