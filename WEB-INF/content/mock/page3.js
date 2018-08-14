require(['mock'], function (Mock) {
    Mock.mock('/run', function (options) {
        var data = {
            "success" : true,
            "message" : []
        },
            time = new Date(Mock.Random.datetime());

        for(var i = 0; i < 200; i++) {
            data.message.push({
                name : Mock.Random.cword(2,10),
                time : time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate() + " "
                + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
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
            });
            time.setTime(time.getTime() + Mock.Random.int(1,20) * 1000);
        }

        return data;
    })
});
