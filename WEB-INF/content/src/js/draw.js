define([
    "jquery", "underscore"
], function ($, _) {
    var DrawCanvas = function (options,data) {
        if (this instanceof DrawCanvas) {
            this.data = data;
            var ctxs = {};
            _.each(options.canvas, function (id) {
                var dom = document.getElementById(options.name + "_" +id),
                    ctx = dom.getContext("2d");
                ctxs[id] = {dom : dom, ctx : ctx};
            });
            this.ctxs = ctxs;
            this.drawXY();
            this.draw();
        } else {
            return new DrawCanvas(options,data);
        }
    };

    DrawCanvas.prototype = {
        constructor: DrawCanvas,
        drawXY: function () {
            var xy = this.ctxs["XY"],
                dom = xy.dom,
                ctx = xy.ctx,
                allHieght = dom.height - DrawCanvas.xy.marginBottom,
                height = allHieght / DrawCanvas.xy.partY;

            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            ctx.fillStyle = DrawCanvas.text.color;

            //画竖轴
            ctx.lineWidth = DrawCanvas.xy.widthY;
            ctx.strokeStyle = DrawCanvas.xy.colorY;
            this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft, y : 0},{x : DrawCanvas.xy.marginLeft, y : dom.height});

            //画横轴
            ctx.lineWidth = DrawCanvas.xy.widthX;
            ctx.strokeStyle = DrawCanvas.xy.colorX;
            this.oneLine(ctx,{x : 0, y : allHieght},{x : dom.width, y : allHieght});

            //画辅助线
            ctx.lineWidth = DrawCanvas.xy.widthx;
            for (var i = 1;i < DrawCanvas.xy.partY ; i++){
                var lheight = height * i,
                    sheight = height * (i + 0.5);
                ctx.strokeStyle = DrawCanvas.xy.colorx;
                this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 20, y : lheight},{x : dom.width, y : lheight});
                ctx.strokeStyle = DrawCanvas.xy.colorY;
                this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 12, y : sheight},{x : DrawCanvas.xy.marginLeft, y : sheight});
                if(i === 1) {
                    this.oneLine(ctx,{x : DrawCanvas.xy.marginLeft - 12, y : height * (i - 0.5)},{x : DrawCanvas.xy.marginLeft, y : height * (i - 0.5)});
                }
                var number = (DrawCanvas.xy.partY - i) * 20,
                    marginLeft = DrawCanvas.xy.marginLeft - (number < 100 ?  60 : 80);
                ctx.fillText(number, marginLeft , lheight + 12);
            }
        },
        draw : function (data) {
            if(data) {
                this.data = data;
            }
            this.drawSpeed();
        },
        drawSpeed : function () {

        },
        oneLine : function (ctx,start,end) {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.closePath();
        }
    };

    DrawCanvas.color = {
        red : "#f92121",
        green :"#7dd667",
        blue : "#3498db",
        yellow : "#ffd629",
        black : "#333333",
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
        marginBottom : 15 * 4,
        partY : 8
    };

    DrawCanvas.signal = {
        width : 1,
        color : "#999"
    };

    DrawCanvas.text = {
        font_family : "微软雅黑",
        font_size_normal : "32px",
        font_size_title : "64px",
        color : "#ddd"
    };

    return DrawCanvas;
});
