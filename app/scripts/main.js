// root namespace
var GAME = {

    fps: 60,
    ballRadius: 10,


    devicePixelRatio: window.devicePixelRatio,
};

GAME.noop = function() {};

GAME.Game = function() {



};

GAME.Game.prototype.constructor = GAME.Game;

GAME.Game.prototype.run = function() {
    var self = this;

    var $win = $(window),
        $doc = $(document),
        $body = $('body');



    // move to on window resize
    self.winWidth = $win.width();
    self.winHeight = $win.height();
    var $svg = $('.game');
    $svg.width(self.winWidth);
    $svg.height(self.winHeight);

    self.BALL_RADIUS = 10;
    self.DROP_RADIUS = self.winWidth / 2.5;
    self.BODY_GUTTER = 25;
    self.MIN_DROP_ANGLE = 20;
    self.MAX_DROP_ANGLE = 120;
    self.BALL_RADIUS = 10;
    self.DROP_THICKNESS = self.BALL_RADIUS * 3;

    self.ballColor = "#393833";


    self.ballAngle = 0;
    this.middleX = this.winWidth / 2;
    this.middleY = this.winHeight / 2;


    self.ball = document.getElementById('ball');
    self.drop = document.getElementById('drop');



    self.ball.setAttribute("cx", self.middleX);
    self.ball.setAttribute("cy", self.middleY - self.DROP_RADIUS);
    self.ball.setAttribute("r", self.BALL_RADIUS);

    self.ball.setAttribute("fill", self.ballColor);

    self.ball.setAttribute("transform", "rotate(" + self.ballAngle + " " + self.middleX + " " + self.middleY + ")");

    self.velocity = 2;

    self.drawDrop();

    self.ballLoopAnim = setInterval(function() {
        self.ballAngle += self.velocity;

        if (self.ballAngle > 360) {
            self.ballAngle = 0;
        }

        self.ballFullAngle += self.velocity;

        self.ball.setAttribute("transform", "rotate(" + self.ballAngle + " " + self.middleX + " " + self.middleY + ")");
        //self.drop.setAttribute("transform", "rotate(" + self.ballAngle + " " + self.middleX + " " + self.middleY + ")");
    }, 1000 / GAME.fps);

};


GAME.Game.prototype.drawDrop = function(angle, size, color) {
    var self = this;

    self.randomDropAngle = Math2.randomInt(self.MIN_DROP_ANGLE, self.MAX_DROP_ANGLE);
    self.randomDropRotation = Math2.randomInt(0, 360 - self.randomDropAngle);

    var d = self.randomDropAngle,
        dr = d - 90,
        radians = Math.PI * (dr) / 180,
        startY = self.middleY - self.DROP_RADIUS,
        endx = self.middleX + self.DROP_RADIUS * Math.cos(radians),
        endy = self.middleY + self.DROP_RADIUS * Math.sin(radians),
        largeArc = d > 180 ? 1 : 0,
        path = "M" + self.middleX + "," + startY + " A" + self.DROP_RADIUS + "," + self.DROP_RADIUS + " 0 " + largeArc + ",1 " + endx + "," + endy;

    this.drop.setAttribute("d", path);
    this.drop.setAttribute("transform", "rotate(" + self.randomDropRotation + " " + self.middleX + " " + self.middleY + ")");
};

GAME.Game.prototype.action = function() {
    var self = this;

    var dropIn = self.randomDropRotation - self.BALL_RADIUS;
    var dropOut = self.randomDropRotation + self.randomDropAngle + self.BALL_RADIUS;

    if (self.ballAngle > dropIn && self.ballAngle <= dropOut) {
        //this.bonus();
        //this.$scorePoints.html(this.counterPoint);
        this.drawDrop();
        //this.level();
    } else {
        //this.gameover();
        //this.$gameLayout.addClass("is-hidden");
        console.log('game over ');
    }

    //this.bestScore();
};
