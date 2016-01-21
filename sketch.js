var startScreen = true;
var gameScreen = false;
var endScreen = false;
var offset;



var centreCirc;
var score;
var shootingCircles;
var circleCount;

var goodSound;
var badSound;


var circleColour;
var circleDirection;

function preload() {

  goodSound = loadSound('assets/good.wav');
  badSound = loadSound('assets/bad.wav');

}

function setup() {

  //Create environment
  createCanvas(800, 800);
  background(255);
  fill(0);
  noStroke();
  //initialize game variables
  offset = 0;
  circleCount = 10;
  shootingCircles = [];
  score = 0;


  //Create the shooting circles and add them to array
  for (i = 0; i < circleCount; i++) {

    //Randomly select circle colour
    var col = floor(random(4));

    if (col == 0) {
      circleColour = "red";
    } else if (col == 1) {
      circleColour = "green";

    } else if (col == 2) {
      circleColour = "blue";

    } else if (col == 3) {
      circleColour = "yellow";

    }
    //Randomly select directio
    var dir = floor(random(4));
    if (dir == 0) {
      circleDirection = "up";
    } else if (dir == 1) {
      circleDirection = "down";

    } else if (dir == 2) {
      circleDirection = "left";

    } else if (dir == 3) {
      circleDirection = "right";

    }

    //Add to array
    shootingCircles.push(new ShootCircle(width, height, 20, 5, circleColour, circleDirection));

  }


  centreCirc = new CentreCircle(100, 0, 0, shootingCircles);

}

function draw() {
  background(255);
  fill(0);
  if (startScreen) {
    textSize(32);
    text("Welcome to super circle colour match", 100, 200);
    text("Match the flying circles to the same colour", 100, 250);
    text("press any key to start", 100, 300);
  }
  if (gameScreen) {
    background(128);
    fill(255);
    textSize(32);
    text("Score: " + score, 100, 100);

    push();
    translate(width / 2, height / 2);
    if (offset < circleCount) {

      centreCirc.update();
      shootingCircles[offset].update();
      shootingCircles[offset].render();
      centreCirc.collisionDetection();

    } else {
      gameScreen = false;
      endScreen = true;

    }

    pop();


  }

  if (endScreen) {

    background(255);
    fill(0);

    textSize(32);

    if (score > 0) {
      text("Well Done", 100, 200);
      text("You Scored " + score + " points", 100, 250);

    } else {
      text("Oh dear", 100, 200);
      text("You Scored " + score + " points", 100, 250);
    }

    text("press any key to play again", 100, 300);
  }

}

function CentreCircle(size, x, y, shootingCircles) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.shootingCircles = shootingCircles;
  this.a = PI / 2;


  CentreCircle.prototype.collisionDetection = function() {
    //get the x y position and direction of current circle
    var currentCircle = shootingCircles[offset];
    var currentX = currentCircle.x;
    var currentY = currentCircle.y;
    var currentDirection = currentCircle.direction;
    var currentColour = currentCircle.textColour;


    //test if the position of the current circle is within the radius of the Centre Circle
    //Then compare with the rotation of the circle

    if (currentDirection === "down") {

      if (currentY > -this.size / 2 && currentY < 0) {


        if (this.a > 0 && this.a < PI / 2) {

          this.collisionColour = "blue";
        }

        if (this.a > PI / 2 && this.a < PI) {

          this.collisionColour = "green";
        }

        if (this.a < 0 && this.a > -PI / 2) {

          this.collisionColour = "yellow";
        }

        if (this.a < -PI / 2 && this.a > -PI) {

          this.collisionColour = "red";
        }

      }

    }

    if (currentDirection === "up") {

      if (currentY > 0 && currentY < this.size / 2) {


        if (this.a > 0 && this.a < PI / 2) {

          this.collisionColour = "red";

        }

        if (this.a > PI / 2 && this.a < PI) {

          this.collisionColour = "yellow";
        }

        if (this.a < 0 && this.a > -PI / 2) {

          this.collisionColour = "green";
        }

        if (this.a < -PI / 2 && this.a > -PI) {

          this.collisionColour = "blue";

        }


      }

    }

    if (currentDirection === "left") {

      if (currentX > 0 && currentX < this.size / 2) {

        if (this.a > 0 && this.a < PI / 2) {

          this.collisionColour = "yellow";
        }

        if (this.a > PI / 2 && this.a < PI) {

          this.collisionColour = "blue";
        }

        if (this.a < 0 && this.a > -PI / 2) {

          this.collisionColour = "red";
        }

        if (this.a < -PI / 2 && this.a > -PI) {

          this.collisionColour = "green";
        }

      }

    }

    if (currentDirection === "right") {

      if (currentX > -this.size / 2 && currentX < 0) {

        if (this.a > 0 && this.a < PI / 2) {

          this.collisionColour = "green";
        }

        if (this.a > PI / 2 && this.a < PI) {

          this.collisionColour = "red";
        }

        if (this.a < 0 && this.a > -PI / 2) {

          this.collisionColour = "blue";
        }

        if (this.a < -PI / 2 && this.a > -PI) {

          this.collisionColour = "yellow";
        }

      }

    }



    if (!shootingCircles[offset].collided) {

      if (this.collisionColour) {

        if (this.collisionColour === currentColour) {
          goodSound.play();
          score++;
        } else if (this.collisionColour !== currentColour) {
          badSound.play();
          score -= 2;
        }
        shootingCircles[offset].collided = true;
        this.collisionColour = false;
        offset++;

      }

    }


  }


  CentreCircle.prototype.update = function() {

    this.a = atan2(mouseY - height / 2, mouseX - width / 2);

    fill(255, 0, 0);
    arc(this.x, this.y, this.size, this.size, this.a, HALF_PI + this.a);
    fill(0, 255, 0);
    arc(this.x, this.y, this.size, this.size, HALF_PI + this.a, PI + this.a);
    fill(0, 0, 255);
    arc(this.x, this.y, this.size, this.size, PI + this.a, (PI + HALF_PI) + this.a);
    fill(255, 255, 0);
    arc(this.x, this.y, this.size, this.size, (PI + HALF_PI) + this.a, this.a);

  }

}

function ShootCircle(x, y, size, speed, colour, direction) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.textColour = colour
  this.colour = colour;
  this.direction = direction;
  this.collided = false;


  //Set initial x and y values based on direction
  if (this.direction === "right") {
    this.x = -width / 2;
    this.y = 0;
  } else if (this.direction === "down") {
    this.x = 0;
    this.y = -height / 2;

  } else if (this.direction === "left") {
    this.x = width;
    this.y = 0;
  } else if (this.direction === "up") {
    this.x = 0;
    this.y = height;
  }


  //Set colour

  if (this.textColour === "red") {
    this.colour = color(255, 0, 0);

  } else if (this.textColour === "green") {
    this.colour = color(0, 255, 0);
  } else if (this.textColour === "blue") {
    this.colour = color(0, 0, 255);
  } else if (this.textColour === "yellow") {
    this.colour = color(255, 255, 0);
  }


  ShootCircle.prototype.update = function() {

    if (!this.collided) {

      if (this.direction === "right") {
        this.x += this.speed;
      } else if (this.direction === "down") {
        this.y += this.speed;

      } else if (this.direction === "left") {
        this.x -= this.speed;
      } else if (this.direction === "up") {
        this.y -= this.speed;

      }

    }
  }

  ShootCircle.prototype.render = function() {

    fill(this.colour);
    ellipse(this.x, this.y, this.size, this.size);

  }

}

function keyPressed() {
  if (startScreen) {
    startScreen = false;
    gameScreen = true;
  }

  if (endScreen) {
    endScreen = false;
    startScreen = true;
    setup();
  }
}