define([
    "jquery", "underscore","artTemplate","text!templates/gykTop.html"
], function ($, _ , template, gykTop) {
    var UpdateData = function (options) {
        if (this instanceof UpdateData) {
           
        } else {
            return new UpdateData(options);
        }
    };

    UpdateData.prototype = {
        constructor: UpdateData,
        render : function (data) {
            this.renderTop(data);
        },
        renderTop : function (data) {
            var time = data.time.split(" ");
            $("#gyk_top").html(template.compile(gykTop)($.extend({},data,{
                time : time[1],
                date : time[0]
            })));
            this.setLight();
        },
        //设置灯
        setLight: function () {
            var $sprites = $("#sprites");
            var data = $sprites.attr("title");
            var light = !data ? "" : data.split(" ");
            var lightClass;
            if (light[0] == "多灯") {
                $("#manyLights").show();
            }
            switch (light[1]) {
                case "双黄灯":
                    lightClass = "double_yellow_light";
                    break;
                case "双黄闪灯":
                    lightClass = "double_yellow_flash_light";
                    break;
                case "绿2灯":
                    lightClass = "green2_light";
                    break;
                case "绿3灯":
                    lightClass = "green3_light";
                    break;
                case "绿4灯":
                    lightClass = "green4_light";
                    break;
                case "绿5灯":
                    lightClass = "green5_light";
                    break;
                case "绿灯":
                    lightClass = "green_light";
                    break;
                case "绿黄2灯":
                    lightClass = "green_yellow2_light";
                    break;
                case "绿黄灯":
                    lightClass = "green_yellow_light";
                    break;
                case "红灯":
                    lightClass = "red_light";
                    break;
                case "红黄闪灯":
                    lightClass = "red_yellow_flash_light";
                    break;
                case "红黄灯":
                    lightClass = "red_yellow_light";
                    break;
                case "白灯":
                    lightClass = "white_light";
                    break;
                case "黄2闪灯":
                    lightClass = "yellow2_flash_light";
                    break;
                case "黄2灯":
                    lightClass = "yellow2_light";
                    break;
                case "黄灯":
                    lightClass = "yellow_light";
                    break;
                default:
                    lightClass = "";
            }
            $sprites.attr("class","").addClass("sprites " + lightClass);
            return this;
        },
    };
    

    return UpdateData;
});
