'use strict';

let thisSketch;
let thisCanvas;

const myp5 = new p5(function(sketch) {
    thisSketch = sketch;
    mySketch();
},'container');

function mySketch() {
  thisSketch.setup = setup;
  thisSketch.draw = draw;

  //vars
  let xSpacing;
  let ySpacing;
  //colours
  const cyan = [71, 180, 174];
  const yellow = [239, 218, 75];
  const circleArray = [];
  const bgCircleArray = [];

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
      const myCanvas = thisSketch.createCanvas(600, 480);
      myCanvas.parent('container');

      xSpacing = thisSketch.width / 30;
      ySpacing = thisSketch.height / 20;

      thisSketch.background(cyan[0], cyan[1], cyan[2]);
      // Background shapes
      for (let y = 0; y <= thisSketch.height; y += ySpacing) {
        for (let x = 0; x <= thisSketch.width; x += xSpacing) {
          const myRandom = thisSketch.random(1,10);
          const myBgC = new Circle(x, y, myRandom, myRandom, 2, 0);
          bgCircleArray.push(myBgC);
        }
      }

      const radius = 100;
      const numPoints = 20;
      const angle = thisSketch.TWO_PI/numPoints;
      // Circle
      for (let i=0; i < numPoints; i++) {
        const xPos = (radius * thisSketch.sin(angle*i)) + thisSketch.width/2;
        const yPos = (radius * thisSketch.cos(angle*i)) + thisSketch.height/2;
        const myCirc = new Circle(xPos, yPos, i, i);
        circleArray.push(myCirc);
      }
  }

  function draw() {
    thisSketch.background(cyan[0], cyan[1], cyan[2]);
    // var f = 1;
    // while (f < 90) {
    //     thisSketch.save(thisCanvas, 'myCanvas' + f + '.jpg');
    // }

    const wobble = thisSketch.sin(thisSketch.millis() / 1000);

    for (let i = 0; i < bgCircleArray.length; i++) {
        bgCircleArray[i].paint();
        bgCircleArray[i].update(0);
    }

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].paint();
        circleArray[i].update(wobble);
    }
  }
}
