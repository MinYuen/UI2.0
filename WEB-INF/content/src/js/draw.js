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
            this.drawXY();
            this.drawRuler();
        } else {
            return new DrawCanvas(options);
        }
    };

    DrawCanvas.prototype = {
        constructor: DrawCanvas,
        //画坐标轴
        drawXY: function () {
            var xy = this.ctxs["XY"],
                dom = xy.dom,
                ctx = xy.ctx,
                allHeight = dom.height - DrawCanvas.xy.marginBottom,
                allWidth = dom.width - DrawCanvas.xy.marginLeft,
                eachHeight = allHeight / DrawCanvas.xy.partY;
            
            this.allHeight = allHeight;
            this.allWidth = allWidth;

            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            ctx.fillStyle = DrawCanvas.text.color;

            //画竖轴
            ctx.lineWidth = DrawCanvas.xy.widthY;
            ctx.strokeStyle = DrawCanvas.xy.colorY;
            this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft, y : 0},{x : DrawCanvas.xy.marginLeft, y : dom.height});

            //画横轴
            ctx.lineWidth = DrawCanvas.xy.widthX;
            ctx.strokeStyle = DrawCanvas.xy.colorX;
            this.oneLine(ctx,{x : 0, y : allHeight},{x : dom.width, y : allHeight});

            for (var j = 1; j < 4; j++) {
                var x = DrawCanvas.xy.marginLeft + this.allWidth / 4 * j;
                this.oneLine(ctx,{x : x, y : allHeight - 14},{x : x, y : allHeight});
            }

            //画辅助线
            ctx.lineWidth = DrawCanvas.xy.widthx;
            for (var i = 1;i < DrawCanvas.xy.partY ; i++){
                var lheight = eachHeight * i,
                    sheight = eachHeight * (i + 0.5);
                ctx.strokeStyle = DrawCanvas.xy.colorx;
                this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 20, y : lheight},{x : dom.width, y : lheight});
                ctx.strokeStyle = DrawCanvas.xy.colorY;
                this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 12, y : sheight},{x : DrawCanvas.xy.marginLeft, y : sheight});
                if(i === 1) {
                    this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 12, y : eachHeight * (i - 0.5)},{x : DrawCanvas.xy.marginLeft, y : eachHeight * (i - 0.5)});
                }
                var number = (DrawCanvas.xy.partY - i) * DrawCanvas.xy.eachY,
                    marginLeft = DrawCanvas.xy.marginLeft - (number < 100 ?  60 : 80);
                ctx.fillText(number, marginLeft , lheight + 12);
            }

            //画框
            ctx.fillStyle = DrawCanvas.color.black;
            this.drawRoundRect(ctx, DrawCanvas.xy.marginLeft + 20, 15, allWidth/4 - 50*2, eachHeight * 2 - 20*2, 16);
        },
        //动态绘制
        draw : function (data) {
            if(data) {
                if(data.length !== 0) {
                    this.data = data;
                    this.drawLine("speed");
                    this.drawLine("limitSpeed");
                    this.drawGLB();
                    this.render();
                }
            }
        },
        //画速度、限速
        drawLine : function (type) {
            var dom = this.ctxs[type].dom,
                ctx = this.ctxs[type].ctx,
                data = this.data,
                left = DrawCanvas.xy.marginLeft;
            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.lineWidth = DrawCanvas[type].width;
            ctx.strokeStyle = DrawCanvas[type].color;
            ctx.beginPath();
            for (var i = 0; i < data.length; i++){
                if(i===0){
                    ctx.moveTo(left, this.countY(data[i][type]));
                }else{
                    left += (new Date(data[i].time).getTime() - new Date(data[i-1].time).getTime())/1000;
                    ctx.lineTo(left, this.countY(data[i][type]));
                    ctx.stroke();
                }
            }
            ctx.closePath();
        },
        //画标尺
        drawRuler : function () {
            var that = this,
                xy = this.ctxs["ruler"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.lineWidth = DrawCanvas.ruler.width;
            ctx.strokeStyle = DrawCanvas.ruler.color;
            redraw(DrawCanvas.xy.marginLeft + this.allWidth/4);

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
                        if(x >= DrawCanvas.xy.marginLeft){
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
                that.oneLine(ctx, {x: x, y: 0}, {x: x, y: that.allHeight});
                that.current = that.reverseX(x);
                if(that.data){
                    if(that.data.length !== 0) {
                        that.render();
                    }
                }
            }
        },
        render : function () {
            var index = this.getNear(this.current),
                one = this.data[index];
            one = $.extend({},one,{
                info : [
                    this.data[index-1].other,
                    this.data[index].other,
                    this.data[index+1].other
                ]
            });
            this.drawText(one);
            this.updateData.render(one);
        },
        //画公里标
        drawGLB : function () {
            var xy = this.ctxs["GLB"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            ctx.fillStyle = DrawCanvas.text.color;

            for (var i = 1; i < 4; i++) {
                var x = DrawCanvas.xy.marginLeft + this.allWidth / 4 * i,
                index = this.getNear(this.reverseX(x));
                ctx.fillText(this.data[index].glb, x - 40 , this.allHeight + 40);
            }
        },
        //画文字
        drawText : function (one) {
            var xy = this.ctxs["text"],
                dom = xy.dom,
                ctx = xy.ctx;

            ctx.clearRect(0, 0, dom.width, dom.height);
            ctx.font = DrawCanvas.text.font_size_title + " " + DrawCanvas.text.font_family;

            //行车模式
            ctx.fillStyle = DrawCanvas.color.yellow;
            ctx.fillText(one.name.substring(0,6), DrawCanvas.xy.marginLeft + 40, 60);
            ctx.fillText(one.name.substring(6,12), DrawCanvas.xy.marginLeft + 40, 110);

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
        reverseX : function (x) {
            return (x - DrawCanvas.xy.marginLeft)/this.allWidth * this.space;
        },
        //传入time得到x值
        countX : function (time) {
            var start = new Date(this.data[0].time).getTime(),
                now = new Date(time).getTime();
            return DrawCanvas.xy.marginLeft + now - start;
        },
        //传入速度得到y值
        countY : function (number) {
            return this.allHeight - this.allHeight/(DrawCanvas.xy.partY * DrawCanvas.xy.eachY) * number;
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

    DrawCanvas.xy = {
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

    DrawCanvas.text = {
        font_family : "微软雅黑",
        font_size_normal : "28px",
        font_size_title : "36px",
        color : "#ddd"
    };

    return DrawCanvas;
});
