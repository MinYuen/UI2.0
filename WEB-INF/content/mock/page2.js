require(['mock'], function (Mock) {
    Mock.mock('/page2', function (options) {
        var data = {
            "success": true,
            "message": []
        };
        var rootId = 0;

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
