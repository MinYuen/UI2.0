require(['mock'], function (Mock) {
    Mock.mock('/run', function (options) {
        var data = {
            "success" : true,
            "message" : []
        };

        for(var i = 0; i < 200; i++) {
            data.message.push({
                name : Mock.Random.cword(2,10),
                time : Mock.Random.datetime(),
                glb : Mock.Random.int(1000,10000),
                distance : Mock.Random.int(0,1000),
                station : Mock.Random.cword(2,5),
                signal : Mock.Random.cword(2,3),
                speed : Mock.Random.int(0,100),
                limitSpeed : Mock.Random.int(0,120),
                kongdang : "空档",
                qianhou : "前后",
                guanya : Mock.Random.int(0,1000),
                other : Mock.Random.csentence()
            })
        }

        return data;
    })
});
