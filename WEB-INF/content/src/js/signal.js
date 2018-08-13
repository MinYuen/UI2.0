/**
 * Created by raven on 2018/7/12.
 */
var Signal = function (options) {
    if (this instanceof Signal) {
        var info = Signal.info;
        this.options = options;
        this.position = Signal.type[options.type];
        this.x = this.position.left ? options.x - info.round : options.x + info.round;
        this.y = this.position.top ? options.y - info.round - info.move : options.y + info.round + info.move;
        if (this.position.long) {
            this.position.left ? this.x -= info.long : this.x += info.long;
        }
        this.draw();
    } else {
        return new Signal(options);
    }
};

Signal.prototype = {
    constructor: Signal,
    draw : function (color) {
        if(this.options.static){
            this.line();
            this.singleCircle();
        }else{
            clearInterval(this.circleTwinkle);
            color = !color ? "15" : color;
            var c = Signal.color[color];
            c.twinkle ? this.twinkle(c) : this.circle(c);
        }
    },
    line : function () {
        var options = this.options,
            position = this.position,
            ctx = options.ctx,
            info = Signal.info;
        ctx.beginPath();
        ctx.moveTo(options.x, position.top ? options.y - info.move : options.y + info.move);
        ctx.lineTo(options.x, position.top ? options.y - info.line : options.y + info.line);
        if (position.long) {
            ctx.moveTo(options.x, this.y);
            ctx.lineTo(position.left ? options.x - info.long : options.x + info.long, this.y);
        }
        ctx.stroke();
    },
    twinkle : function (c) {
        var that = this;
        var twinkle = true;
        this.circleTwinkle = setInterval(toggle,1000);
        function toggle() {
            twinkle ? that.circle(c) : that.singleCircle();
            twinkle = !twinkle;
        }
    },
    circle : function (c) {
        if(!c.color2){
            this.singleCircle(c.color1);
        }else{
            this.doubleCircle(c.color1,c.color2);
        }
    },
    doubleCircle : function (color1,color2) {
        this.singleCircle(color1,0,Math.PI);
        this.singleCircle(color2,Math.PI,2*Math.PI);
    },
    singleCircle : function (color,start,end) {
        var options = this.options,
            ctx = options.ctx,
            info = Signal.info;
        ctx.beginPath();
        ctx.arc(this.x, this.y, info.round, !start ? 0 : start, !end ? 2 * Math.PI : end);
        ctx.closePath();
        ctx.fillStyle = !color ? DrawCanvas.color.black : color;
        ctx.fill();
        ctx.stroke();
    }
};

Signal.type = {
    "0" : {long: false, top: true, left: false},
    "1" : {long: false, top: false, left: true},
    "2" : {long: true, top: true, left: false},
    "3" : {long: true, top: false, left: true},
    "4" : {long: false, top: false, left: false},
    "5" : {long: false, top: true, left: true},
    "6" : {long: true, top: false, left: false},
    "7" : {long: true, top: true, left: true}
};

Signal.info = {
    round : 6,
    line : 18,
    long : 5,
    move : 6
};

/*Signal.info = {
    round : 8,
    line : 22,
    long : 5,
    move : 6
};*/

Signal.color = {
    "0" : {
        "color1" : DrawCanvas.color.red,
        "twinkle" : false
    },
    "1" : {
        "color1" : DrawCanvas.color.yellow,
        "twinkle" : false
    },
    "2" : {
        "color1" : DrawCanvas.color.green,
        "color2" : DrawCanvas.color.yellow,
        "twinkle" : false
    },
    "3" : {
        "color1" : DrawCanvas.color.yellow,
        "color2" : DrawCanvas.color.yellow,
        "twinkle" : false
    },
    "4" : {
        "color1" : DrawCanvas.color.green,
        "color2" : DrawCanvas.color.green,
        "twinkle" : false
    },
    "5" : {
        "color1" : DrawCanvas.color.yellow,
        "color2" : DrawCanvas.color.yellow,
        "twinkle" : true
    },
    "6" : {
        "color1" : DrawCanvas.color.red,
        "color2" : DrawCanvas.color.white,
        "twinkle" : false
    },
    "7" : {
        "color1" : DrawCanvas.color.green,
        "twinkle" : false
    },
    "8" : {
        "color1" : DrawCanvas.color.white,
        "twinkle" : false
    },
    "9" : {
        "color1" : DrawCanvas.color.white,
        "twinkle" : true
    },
    "10" : {
        "color1" : DrawCanvas.color.yellow,
        "twinkle" : true
    },
    "11" : {
        "color1" : DrawCanvas.color.green,
        "twinkle" : true
    },
    "12" : {
        "color1" : DrawCanvas.color.red,
        "twinkle" : true
    },
    "13" : {
        "color1" : DrawCanvas.color.blue,
        "twinkle" : false
    },
    "14" : {
        "color1" : DrawCanvas.color.black,
        "twinkle" : false
    },
    "15" : {
        "color1" : DrawCanvas.color.black,
        "twinkle" : false
    }
};