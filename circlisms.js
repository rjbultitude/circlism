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

define(['p5'], function(p5) {
    'use strict';

    var thisSketch;

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
        var rectWidth = 15;
        //colours
        var cyan = [71, 180, 174];
        var darkCyan = [48, 123, 118];
        var yellow = [239, 218, 75];
        var squareArray = [];
        var circSqArray = [];
        var wobble;

        function setup() {
            //thisSketch.frameRate(30);
            var myCanvas = thisSketch.createCanvas(600, 600);
            myCanvas.parent('toys-cubism');

            xSpacing = thisSketch.width / 80;
            ySpacing = thisSketch.height / 80;

            thisSketch.background(cyan[0], cyan[1], cyan[2]);
            //grid
            for (var y = 0; y < thisSketch.height; y += 50) {
                for (var x = 0; x < thisSketch.width; x += 50) {
                    var circSq = new CircleSquare(x, y);
                    circSqArray.push(circSq);
                }
            }
        }

        function CircleSquare(xOffset, yOffset) {
            this.radius = 30;
            this.numPoints = 12;
            this.angle = thisSketch.TWO_PI/this.numPoints;
            this.squares = [];
            this.xOffset = xOffset;
            this.yOffset = yOffset;
            this.xPos;
            this.yPos
            for (var i = 0; i < this.numPoints; i++) {
                this.xPos = (this.radius * thisSketch.sin(this.angle*i)) + this.xOffset;
                this.yPos = (this.radius * thisSketch.cos(this.angle*i)) + this.yOffset;
                var mySq = new Square(this.xPos, this.yPos, i, i, i);
                this.squares.push(mySq);
            }
        }

        CircleSquare.prototype.paint = function() {
            for (var i = 0; i < this.squares.length; i++) {
                this.squares[i].update();
                this.squares[i].paint();
            };
        };

        //Constructor
        function Square(x, y, w, h, wobbleFactor) {
            this.xPos = x;
            this.yPos = y;
            this.width = w;
            this.height = h;
            this.wobbleFactor = wobbleFactor;
        }

        Square.prototype.paint = function() {
            thisSketch.noStroke();
            //thisSketch.strokeWeight(6);
            thisSketch.rectMode(thisSketch.CENTER);
            //thisSketch.stroke(cyan[0], cyan[1], cyan[2]);
            thisSketch.fill(yellow[0], yellow[1], yellow[2]);
            //thisSketch.rect(this.xPos, this.yPos, this.width, this.height);
            thisSketch.ellipse(this.xPos, this.yPos, this.width, this.height);
        };

        Square.prototype.update = function() {
            this.width = this.width + wobble * 1;
            this.height = this.width + wobble * 1;
        };

        function draw() {
            thisSketch.background(cyan[0], cyan[1], cyan[2]);

            wobble = thisSketch.sin(thisSketch.millis() / 1000);

            for (var i = 0; i < circSqArray.length; i++) {
                circSqArray[i].paint();
            }
        }

    }
});