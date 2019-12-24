/**
 * Toys
 *
 * $author       Richard Bultitude
 * $email        richard.bultitude@gmail.com
 * $url          http://www.point-b.co.uk/
 * $copyright    Copyright (c) 2014, point-b.co.uk. All rights reserved.
 *
 * $notes        Notes
 */

'use strict';

var thisSketch;
var thisCanvas;

var myp5 = new p5(function(sketch) {
    thisSketch = sketch;
    mySketch();
},'toys-cubism');

function mySketch() {
    thisSketch.setup = setup;
    thisSketch.draw = draw;

    //vars
    var xSpacing;
    var ySpacing;
    //colours
    var cyan = [71, 180, 174];
    var yellow = [239, 218, 75];
    var circleArray = [];
    var bgCircleArray = [];

    // Main Circle Constructor
    function Circle(x, y, w, h, strokeWeight) {
        this.xPos = x;
        this.yPos = y;
        this.width = w;
        this.height = h;
        this.strokeWeight = strokeWeight || 6;
    }

    Circle.prototype.paint = function() {
        thisSketch.strokeWeight(this.strokeWeight);
        thisSketch.rectMode(thisSketch.CENTER);
        thisSketch.stroke(cyan[0], cyan[1], cyan[2]);
        thisSketch.fill(yellow[0], yellow[1], yellow[2]);
        thisSketch.ellipse(this.xPos, this.yPos, this.width, this.height);
    };

    Circle.prototype.update = function(circWobble) {
        this.width = this.width + circWobble;
        this.height = this.width + circWobble;
    };

    function setup() {
        thisSketch.frameRate(30);
        var myCanvas = thisSketch.createCanvas(600, 480);
        myCanvas.parent('toys-cubism');

        xSpacing = thisSketch.width / 30;
        ySpacing = thisSketch.height / 20;

        thisSketch.background(cyan[0], cyan[1], cyan[2]);
        // Background shapes
        for (var y = 0; y <= thisSketch.height; y += ySpacing) {
            for (var x = 0; x <= thisSketch.width; x += xSpacing) {
                var myRandom = thisSketch.random(1,10);
                var myBgC = new Circle(x, y, myRandom, myRandom, 2, 0);
                bgCircleArray.push(myBgC);
            }
        }
        
        var radius = 100;
        var numPoints = 20;
        var angle = thisSketch.TWO_PI/numPoints;
        // Circle
        for (var i=0; i < numPoints; i++) {
            var xPos = (radius * thisSketch.sin(angle*i)) + thisSketch.width/2;
            var yPos = (radius * thisSketch.cos(angle*i)) + thisSketch.height/2;
            var myCirc = new Circle(xPos, yPos, i, i);
            circleArray.push(myCirc);
        }
    }

    function draw() {
        thisSketch.background(cyan[0], cyan[1], cyan[2]);
        // var f = 1;
        // while (f < 90) {
        //     thisSketch.save(thisCanvas, 'myCanvas' + f + '.jpg');
        // }

        var wobble = thisSketch.sin(thisSketch.millis() / 1000);

        for (var i = 0; i < bgCircleArray.length; i++) {
            bgCircleArray[i].paint();
            bgCircleArray[i].update(0);
        }

        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].paint();
            circleArray[i].update(wobble);
        }
    }

}