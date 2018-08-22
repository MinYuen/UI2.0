require(['mock'], function (Mock) {
    Mock.mock('/page1', function (options) {
        var body = [],obj = {};
        if(options.body){
            body = options.body.split("&");
            for(var i = 0; i < body.length ; i++){
                var tem = body[i].split("=");
                obj[tem[0]] = tem[1];
            }
        }
        var data = {
            "success" : true,
            "message" : {
                "all" : obj.page * obj.rows,
                "row" : []
            }
        };
        for(var j = 0;j < obj.rows ;j++){
            var one = [];
            one.push(Mock.Random.id());
            one.push(Mock.Random.cname(5, 10));
            one.push(Mock.Random.date());
            one.push(Mock.Random.int(1,100));
            one.push(Mock.Random.cword(10, 15));
            one.push(Mock.Random.csentence());
            one.push(Mock.Random.datetime() + " - " + Mock.Random.datetime());
            data.message.row.push(one);
        }
        return data;
    });

});
