require(['mock'], function (Mock) {
    Mock.mock('/test', {
        "success": true,
        "cname": "@cname",
        "number|1-100" : 1,
        "string" : "@string",
        'boolean|1': true,
        "datetime" : "@datetime",
        "ctitle" : "@ctitle(3, 5)",
        "cword" : "@cword(1, 3)",
        "email" : "@email",
        "ip" : "@ip",
        "id" : "@id"
    });

    Mock.mock('/table', function (options) {
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
            one.push(Mock.Random.name(5, 10));
            one.push(Mock.Random.date());
            one.push(Mock.Random.int(1,100));
            one.push(Mock.Random.cword(10, 15));
            one.push(Mock.Random.csentence());
            one.push(Mock.Random.datetime() + "-" + Mock.Random.datetime());
            data.message.row.push(one);
        }
        return data;
    });

    Mock.mock('/tree', function (options) {
        var data = {
            "success": true,
            "message": []
        };
        var rootId = Mock.Random.id();

        getTree(rootId, 2);
        function getTree(parentId, num) {
            var id = Mock.Random.id();
            if (num-- != 0) {
                var random = Mock.Random.int(1,5);
                for(var i=0;i<random;i++){
                    getTree(id, num);
                }
            }
            var one = {
                expand: true,
                id: id,
                parentId: parentId,
                type: "show",
                value: Mock.Random.cword(5, 10)
            };
            data.message.push(one);
        }

        return data;
    })
});
