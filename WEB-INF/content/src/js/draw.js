define([
    "jquery", "underscore","js/updateData.js"
], function ($, _ , UpdateData) {
    var DrawCanvas = function (options) {
        if (this instanceof DrawCanvas) {
            var ctxs = {};
            _.each(options.canvas, function (id) {
                var dom = document.getElementById(options.name + "_" +id),
                    ctx = dom.getContext("2d");
                ctxs[id] = {dom : dom, ctx : ctx};
            });
            this.ctxs = ctxs;
            this.space = options.space; //时间跨度
            this.updateData = new UpdateData();
            this.allHeight = {};
            this.allWidth = {};
            this.drawAxis("XY",true);
            this.drawAxis("xy",false);
            this.drawRuler("XY");
        } else {
            return new DrawCanvas(options);
        }
    };

    DrawCanvas.prototype = {
        constructor: DrawCanvas,
        //画坐标轴
        drawAxis: function (type,main) {
            var xy = this.ctxs[type],
                dom = xy.dom,
                ctx = xy.ctx,
                allHeight = dom.height - DrawCanvas[type].marginBottom,
                allWidth = dom.width - DrawCanvas[type].marginLeft,
                eachHeight = allHeight / DrawCanvas[type].partY;

            this.allHeight[type] = allHeight;
            this.allWidth[type] = allWidth;

            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            ctx.fillStyle = DrawCanvas.text.color;

            //画竖轴
            ctx.lineWidth = DrawCanvas[type].widthY;
            ctx.strokeStyle = DrawCanvas[type].colorY;
            this.oneLine(ctx,{x : DrawCanvas[type].marginLeft, y : 0},{x : DrawCanvas[type].marginLeft, y : dom.height});

            //画辅助线
            ctx.lineWidth = DrawCanvas[type].widthx;
            for (var i = 1;i < DrawCanvas[type].partY ; i++){
                var lheight = eachHeight * i,
                    sheight = eachHeight * (i + 0.5);
                ctx.strokeStyle = DrawCanvas[type].colorx;
                this.oneLine(ctx,{x : DrawCanvas[type].marginLeft - 20, y : lheight},{x : dom.width, y : lheight});
                ctx.strokeStyle = DrawCanvas[type].colorY;
                this.oneLine(ctx,{x : DrawCanvas[type].marginLeft - 12, y : sheight},{x : DrawCanvas[type].marginLeft, y : sheight});
                if(i === 1) {
                    this.oneLine(ctx,{x : DrawCanvas[type].marginLeft - 12, y : eachHeight * (i - 0.5)},{x : DrawCanvas[type].marginLeft, y : eachHeight * (i - 0.5)});
                }
                var number = (DrawCanvas[type].partY - i) * DrawCanvas[type].eachY,
                    marginLeft = DrawCanvas[type].marginLeft - (number < 100 ?  60 : 80);
                ctx.fillText(number, marginLeft , lheight + 10);
            }

            if(main) {
                //画横轴
                ctx.lineWidth = DrawCanvas[type].widthX;
                ctx.strokeStyle = DrawCanvas[type].colorX;
                this.oneLine(ctx,{x : 0, y : allHeight},{x : dom.width, y : allHeight});

                for (var j = 1; j < 4; j++) {
                    var x = DrawCanvas[type].marginLeft + allWidth / 4 * j;
                    this.oneLine(ctx,{x : x, y : allHeight - 14},{x : x, y : allHeight});
                }

                //画框
                ctx.fillStyle = DrawCanvas.color.black;
                this.drawRoundRect(ctx, DrawCanvas[type].marginLeft + 20, 15, allWidth/4 - 50*2, eachHeight * 2 - 20*2, 16);
            }else{
                ctx.fillText("前", dom.width - 30 , eachHeight + 8);
                ctx.fillText("后", dom.width - 30 , eachHeight*3 + 8);

                ctx.strokeStyle = DrawCanvas.qianjin.kongdang;
                ctx.fillText("空档", dom.width - 270 , 30);
                this.oneLine(ctx, {x: dom.width - 205, y: 20}, {x: dom.width - 170, y: 20});

                ctx.strokeStyle = DrawCanvas.qianjin.feikong;
                ctx.fillText("非空", dom.width - 150 , 30);
                this.oneLine(ctx, {x: dom.width - 85, y: 20}, {x: dom.width - 50, y: 20});
            }
        },
        //动态绘制
        draw : function (data) {
            if(data) {
                if(data.length !== 0) {
                    this.data = data;
                    this.drawLine("XY","speed");
                    this.drawLine("XY","limitSpeed");
                    this.drawLine("xy","guanya");
                    this.drawDashed("xy","qianjin");
                    this.drawGLB("XY");
                    this.render("XY");
                }
            }
        },
        //画速度、限速
        drawLine : function (type,name) {
            var dom = this.ctxs[name].dom,
                ctx = this.ctxs[name].ctx,
                data = this.data,
                left = DrawCanvas[type].marginLeft;
            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.lineWidth = DrawCanvas[name].width;
            ctx.strokeStyle = DrawCanvas[name].color;
            ctx.beginPath();
            for (var i = 0; i < data.length; i++){
                if(i===0){
                    ctx.moveTo(left, this.countY(type,data[i][name]));
                }else{
                    left += (new Date(data[i].time).getTime() - new Date(data[i-1].time).getTime())/1000;
                    ctx.lineTo(left, this.countY(type,data[i][name]));
                    ctx.stroke();
                }
            }
            ctx.closePath();
        },
        //画前后空档非空
        drawDashed : function (type,name) {
            var dom = this.ctxs[name].dom,
                ctx = this.ctxs[name].ctx,
                data = this.data,
                left = DrawCanvas[type].marginLeft,
                lastNumber = 0,x = left;
            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.lineWidth = DrawCanvas[name].width;

            for (var i = 0; i < data.length; i++){
                if(i!==0) {
                    var y = this.countY(type, lastNumber);
                    ctx.strokeStyle = DrawCanvas[name][data[i]["kongdang"] ? "kongdang" : "feikong"];
                    this.oneLine(ctx, {x: x, y: y}, {x: left, y: y});
                    x = left;
                    left += (new Date(data[i].time).getTime() - new Date(data[i-1].time).getTime())/1000;
                }
                lastNumber = data[i][name] ? DrawCanvas[type].eachY * 3 : DrawCanvas[type].eachY;
            }
        },
        //画标尺
        drawRuler : function (type) {
            var that = this,
                xy = this.ctxs["ruler"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.lineWidth = DrawCanvas.ruler.width;
            ctx.strokeStyle = DrawCanvas.ruler.color;
            redraw(DrawCanvas[type].marginLeft + this.allWidth[type]/4);

            $(dom).on("mousemove.all",function (ev) {
                var e = ev|| event, x = e.offsetX * 2, y = e.offsetY * 2;
                if(ctx.isPointInStroke(x,y) || ctx.isPointInStroke(x + 4,y) || ctx.isPointInStroke(x - 4,y)){
                    document.body.style.cursor = "move";
                }else{
                    document.body.style.cursor = "";
                }
            });

            $(dom).on("mousedown.all",function (ev) {
                var e = ev|| event, x = e.offsetX * 2, y = e.offsetY * 2;
                if(ctx.isPointInStroke(x,y) || ctx.isPointInStroke(x + 4,y) || ctx.isPointInStroke(x - 4,y)) {
                    $(dom).on("mousemove.tem", function (ev) {
                        var e = ev || event, x = e.offsetX * 2;
                        if(x >= DrawCanvas[type].marginLeft){
                            redraw(x);
                        }
                    });
                    $(dom).one("mouseup.tem", function () {
                        $(dom).off("mousemove.tem");
                    });
                    return false;
                }
            });

            function redraw(x) {
                ctx.clearRect(0, 0, dom.width, dom.height);
                that.oneLine(ctx, {x: x, y: 0}, {x: x, y: that.allHeight[type]});
                that.current = that.reverseX(type,x);
                if(that.data){
                    if(that.data.length !== 0) {
                        that.render(type);
                    }
                }
            }
        },
        //重绘
        render : function (type) {
            var index = this.getNear(this.current),
                one = this.data[index];
            one = $.extend({},one,{
                info : [
                    this.data[index].other,
                    this.data[index+1] ? this.data[index+1].other : "",
                    this.data[index+2] ? this.data[index+2].other : ""
                ]
            });
            this.drawText(type,one);
            this.updateData.render(one);
        },
        //画公里标
        drawGLB : function (type) {
            var xy = this.ctxs["GLB"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            ctx.fillStyle = DrawCanvas.text.color;

            for (var i = 1; i < 4; i++) {
                var x = DrawCanvas[type].marginLeft + this.allWidth[type] / 4 * i,
                index = this.getNear(this.reverseX(type,x));
                ctx.fillText(this.data[index].glb, x - 40 , this.allHeight[type] + 35);
            }
        },
        //画文字
        drawText : function (type,one) {
            var xy = this.ctxs["text"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.font = DrawCanvas.text.font_size_title + " " + DrawCanvas.text.font_family;

            //行车模式
            ctx.fillStyle = DrawCanvas.color.yellow;
            ctx.fillText(one.name.substring(0,6), DrawCanvas[type].marginLeft + 40, 60);
            ctx.fillText(one.name.substring(6,12), DrawCanvas[type].marginLeft + 40, 110);

            //车站
            ctx.fillStyle = DrawCanvas.color.white;
            ctx.fillText(one.station, dom.width - 200, 60);
            ctx.fillText(one.stationDistance + "km", dom.width - 200, 110);
        },
        //得到临近的data的index
        getNear : function (space) {
            var now = new Date(this.data[0].time).getTime() + space;
            for (var i = 0; i < this.data.length; i++) {
                var time = new Date(this.data[i].time).getTime();
                if(time >= now) {
                    return i;
                }
            }
            return i-1;
        },
        //传入x坐标得到time值
        reverseX : function (type,x) {
            return (x - DrawCanvas[type].marginLeft)/this.allWidth[type] * this.space;
        },
        //传入time得到x值
        countX : function (type,time) {
            var start = new Date(this.data[0].time).getTime(),
                now = new Date(time).getTime();
            return DrawCanvas[type].marginLeft + now - start;
        },
        //传入速度得到y值
        countY : function (type,number) {
            return this.allHeight[type] - this.allHeight[type]/(DrawCanvas[type].partY * DrawCanvas[type].eachY) * number;
        },
        //画单线
        oneLine : function (ctx,start,end) {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.closePath();
        },
        //画圆角矩形
        drawRoundRect : function (ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
            ctx.lineTo(width - radius + x, y);
            ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
            ctx.lineTo(width + x, height + y - radius);
            ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI / 2);
            ctx.lineTo(radius + x, height +y);
            ctx.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    };

    DrawCanvas.color = {
        red : "#f92121",
        green :"#7dd667",
        blue : "#3498db",
        yellow : "#ffd629",
        black : "#161616",
        white : "#ffffff",
        grey : "#666666"
    };

    DrawCanvas.XY = {
        colorX : "#3f3f3f",
        colorY : "#3f3f3f",
        colorx : "#232323",
        widthX : 4,
        widthY : 4,
        widthx : 3,
        marginLeft : 24 * 4,
        marginBottom : 12 * 4,
        partY : 8,
        eachY : 20
    };

    DrawCanvas.xy = {
        colorX : "#3f3f3f",
        colorY : "#3f3f3f",
        colorx : "#333333",
        widthX : 4,
        widthY : 4,
        widthx : 3,
        marginLeft : 24 * 4,
        marginBottom : 0,
        partY : 4,
        eachY : 200
    };

    DrawCanvas.ruler = {
        color : DrawCanvas.color.yellow,
        width : 4
    };

    DrawCanvas.speed = {
        color : DrawCanvas.color.green,
        width : 3
    };

    DrawCanvas.limitSpeed = {
        color : DrawCanvas.color.red,
        width : 3
    };

    DrawCanvas.guanya = {
        color : DrawCanvas.color.blue,
        width : 1
    };

    DrawCanvas.qianjin = {
        feikong : DrawCanvas.color.yellow,
        kongdang : DrawCanvas.color.white,
        width : 3
    };

    DrawCanvas.text = {
        font_family : "微软雅黑",
        font_size_normal : "28px",
        font_size_title : "36px",
        color : "#ddd"
    };

    return DrawCanvas;
});
