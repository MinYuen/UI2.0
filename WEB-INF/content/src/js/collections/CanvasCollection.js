define([
    'jquery', 'underscore', 'backbone'
], function ($, _, Backbone) {
    return Backbone.Collection.extend({
        url : '',
        comparator: 'time',
        space : 25 * 60 * 1000,
        getSomeTime : function (start) {
            var that = this,
                end = start + that.space;
            return _.reject(this.toJSON(), function (obj) {
                var time = new Date(obj.time).getTime();
                return time < start || time > end;
            });
        },

        getTimeNumber : function (index) {
            return new Date(this.toJSON()[index].time).getTime();
        }
    });
});
