require(['mock'], function (Mock) {
    Mock.mock('/run', function (options) {
        var data = {
            "success" : true,
            "message" : []
        },
            time = new Date(Mock.Random.datetime()),
            glb = Mock.Random.int(1000,10000);

        for(var i = 0; i < 200; i++) {
            data.message.push({
                name : Mock.Random.cword(2,10),
                time : time.getFullYear() + "-" + padLeft(time.getMonth()+1) + "-" + padLeft(time.getDate()) + " "
                + padLeft(time.getHours()) + ":" + padLeft(time.getMinutes()) + ":" + padLeft(time.getSeconds()),
                glb : glb++,
                distance : Mock.Random.int(0,1000),
                station : Mock.Random.cword(2,5),
                signal : Mock.Random.cword(2,3),
                speed : Mock.Random.int(0,100),
                limitSpeed : Mock.Random.int(120,120),
                kongdang : "空档",
                qianhou : "前后",
                guanya : Mock.Random.int(0,1000),
                other : Mock.Random.csentence()
            });
            time.setTime(time.getTime() + Mock.Random.int(1,20) * 1000);
        }

        function padLeft (string) {
            var vStr = string.toString();
            if (vStr.length < 2) {
                return "0" + vStr;
            }else {
                return vStr;
            }
        }

        return data;
    })
});
