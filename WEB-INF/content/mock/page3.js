require(['mock'], function (Mock) {
    Mock.mock('/run', function (options) {
        var data = {
            "success" : true,
            "message" : []
        },
            time = new Date(Mock.Random.datetime()),
            checi = Mock.Random.int(10000,999999),
            glb = Mock.Random.float(1000,10000,3,3),
            name = ["区间作业进入（目视）","手动临时限速（存在）","正常监控","按键操作","进入本务"],
            shangxiaxing = ["上行","下行","强制上行","强制下行"],
            xingbie = ["上行","下行"],
            speed = ["40","80"],
            limitSpeed = ["100","120"],
            double = ["单灯","多灯"],
            signal = ["双黄灯", "双黄闪灯", "绿2灯", "绿3灯", "绿4灯", "绿5灯", "绿灯", "绿黄2灯", "绿黄灯", "红灯",
                "红黄闪灯", "红黄灯", "白灯", "黄2闪灯", "黄2灯", "黄灯"],
            other = [
                "BTM设备已安装",
                "GMS设备已安装",
                "无线调车设备未安装",
                "平面调车设备未安装",
                "下行，调度命令号1，线路号3008，限速35，起点：115.000km，终点：117.000km，起始时间：2018-05-29 08:06:00，结束时间：2018-05-29 08:06:00,时间无效",
                "下行，调度命令号2，线路号3008，限速35，起点：115.000km，终点：117.000km，起始时间：2018-05-29 08:06:00，结束时间：2018-05-29 08:06:00,时间无效",
                "下行，调度命令号3，线路号3008，限速35，起点：115.000km，终点：117.000km，起始时间：2018-05-29 08:06:00，结束时间：2018-05-29 08:06:00,时间无效",
                "下行，调度命令号4，线路号3008，限速35，起点：115.000km，终点：117.000km，起始时间：2018-05-29 08:06:00，结束时间：2018-05-29 08:06:00,时间无效",
                "下行，调度命令号5，线路号3008，限速35，起点：115.000km，终点：117.000km，起始时间：2018-05-29 08:06:00，结束时间：2018-05-29 08:06:00,时间无效",
                "本务",
                "已断开，匹配失败",
                "已连接，匹配成功",
                "转储文件名"
            ];

        for(var i = 0; i < 200; i++) {
            data.message.push({
                name : name[Mock.Random.int(0,4)],
                time : time.getFullYear() + "-" + padLeft(time.getMonth()+1) + "-" + padLeft(time.getDate()) + " "
                + padLeft(time.getHours()) + ":" + padLeft(time.getMinutes()) + ":" + padLeft(time.getSeconds()),
                glb : glb,
                distance : Mock.Random.int(10000,99999),
                stationDistance : Mock.Random.float(0,10,3,3),
                station : Mock.Random.cword(2,5),
                shangxiaxing : shangxiaxing[Mock.Random.int(0,3)],
                signal : double[Mock.Random.int(0,1)] + " " + signal[Mock.Random.int(0,15)],
                speed : speed[Mock.Random.int(0,1)],
                limitSpeed : limitSpeed[Mock.Random.int(0,1)],
                other : other[Mock.Random.int(0,12)],

                guzhang : Mock.Random.boolean(),
                changyong : Mock.Random.boolean(),
                geli : Mock.Random.boolean(),
                youquan : Mock.Random.boolean(),
                xihuo : Mock.Random.boolean(),
                kongdang : Mock.Random.boolean(),
                qianjin : Mock.Random.boolean(),
                duibiao : Mock.Random.boolean(),
                jiesuo : Mock.Random.boolean(),

                checi : checi,
                guanya : Mock.Random.int(0,800),
                zhixian : Mock.Random.int(0,10),
                gudao : Mock.Random.int(0,10),
                xingbie : xingbie[Mock.Random.int(0,1)],
                jungang : Mock.Random.int(0,1000)
            });
            glb = Mock.Random.float(glb,glb + 1,3,3);
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
