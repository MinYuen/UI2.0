define([
    "jquery", "underscore"
], function ($, _) {
    var DrawCanvas = function (options) {
        if (this instanceof DrawCanvas) {
            var ctxs = {};
            _.each(options.canvas, function (id) {
                var dom = document.getElementById(options.name + "_" +id);
                ctxs[id] = {
                    dom : dom,
                    ctx : dom.getContext("2d")
                }
            });
            this.ctxs = ctxs;
            this.drawXY();
        } else {
            return new DrawCanvas(id);
        }
    };

    DrawCanvas.prototype = {
        constructor: DrawCanvas,
        drawXY: function () {

        },
        draw: function (d) {
            this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
        },
        //线
        line: function (d) {
            var ctx = this.ctx,
                data = this.data,
                line = data.line;
            ctx.lineWidth = DrawCanvas.line.width;
            ctx.strokeStyle = DrawCanvas.line.color;
            for (var i in line) {
                var one = line[i];
                this.oneLine(one.start,one.end);
            }
        },
        //字
        text: function (d) {
            var ctx = this.ctx,
                data = this.data,
                text = data.text,
                station = data.station;
            ctx.font = DrawCanvas.text.font_size_normal + " " + DrawCanvas.text.font_family;
            for (var i in text) {
                var one = text[i];
                ctx.fillStyle = DrawCanvas.text.color_normal[one.txtcolor];
                ctx.fillText(one.text, one.x, one.y + 12);
            }
            ctx.fillStyle = DrawCanvas.text.color_title;
            ctx.font = DrawCanvas.text.font_size_title + " " + DrawCanvas.text.font_family;
            ctx.fillText(station.station_name, 0, DrawCanvas.text.top);
        },
        oneLine : function (s,e) {
            var ctx = this.ctx,
                data = this.data,
                point = data.point,
                start = point[s],
                end = point[e];
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
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

    DrawCanvas.line = {
        width : 1,
        color : DrawCanvas.color.grey
    };

    DrawCanvas.signal = {
        width : 1,
        color : "#999"
    };

    DrawCanvas.text = {
        font_family : "微软雅黑",
        font_size_normal : "12px",
        font_size_title : "16px",
        color_normal : {
            "14" : DrawCanvas.color.yellow,
            "15" : DrawCanvas.color.white,
            "71" : DrawCanvas.color.green
        },
        color_title : "#eee",
        top : 50
    };

    return DrawCanvas;
});
