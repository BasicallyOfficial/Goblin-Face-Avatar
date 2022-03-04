let micVar;
let mic;
let sketchStarted = false;
let Crosseye = 0;
let irisColor = 0;
let myWarts = [];
var y;
var changeDirection;

function setup() {
  createCanvas(500, 500);
    y = height*.1;
	changeDirection = false;
   irisColor = random(255);
   createButton("Start").mousePressed(startSketch);
  for (let i = 0; i < 6; i++) {
    let x = random(width*.075, width*.925);
     let y = random(height*.075, height*.925);
    myWarts[i] = new wart(x,y);
  }
}

function startSketch(){
  mic = new p5.AudioIn();
  mic.start();
  sketchStarted = true;
}

function draw() {

if (sketchStarted) {

   background(41,100,10);

  //wart array
  for (let i = 0; i < 6; i++) {
    myWarts[i].display();
    myWarts[i].move();
  }

  //microphone
  micVar = map(mic.getLevel(), 0 ,0.1, 0, 150);
  console.log(mic.getLevel());
  console.log(micVar);
  Face();

  //Cross Eye Conditional
  if (mouseX > width*.35 && mouseX < width*0.65) {
    if (mouseY > height*.2 && mouseY < height*0.35) {
      Crosseye = 1;
    } else {
       Crosseye = 0;
    }
  } else {
   Crosseye = 0;
  }


}

function Face(){

  //Sclera
  drawSclera(width*.2, height*.3,width*.2,);
  drawSclera(width*.8, height*.3,width*.2,);

  //iris
  push()
  fill(irisColor)
  drawIris(width*.2, height*.3,width*.11);
  drawIris(width*.8, height*.3,width*.11);
   if (frameCount % 60 == 0) {
  	irisColor = color(random(255), random(255), random(255));
  }
 pop()

   //pupil
  movePupil();

  //mouth
  push()
  noFill()
  fill(0)
   rect(width*.25, height*.52, width*.5, height*.02+micVar/1.5, width*.2);
  pop()

  //nose
  push()
  strokeWeight(7);
  line(width*.5, height*.68,width*.35,height*.2);
  line(width*.5, height*.68,width*.65,height*.2);
  pop()
  push()
  strokeWeight(0);
  fill(41,100,10);
  triangle(width*.5, height*.68,width*.35,height*.2,width*.65,height*.2);
   fill(15, 79, 29)
    ellipse(width*.47, height*.46, 25)
   ellipse(width*.58, height*.3, 25)
  pop()

  //chin
  push()
  drawSemicircle(width*.2, height*.1, width*.3, height*.8, width*.5, height*.78, width*.6, height*.1)
  drawSemicircle(width*.8, height*.1, width*.7, height*.8, width*.5, height*.78, width*.4, height*.1)
  pop()

  //brow
  push()
  drawLine(width*.1, y-18, width*.3, y+5);
  drawLine(width*.7, y+5,  width*.9, y-18);
  if(y>height*.18){
		changeDirection=true}
  else if (y<=height*.1){
		changeDirection=false}
  if (y>=0 && changeDirection == false){
		y=y+1}
  else if(changeDirection == true){
		y=y-1}
  pop()
}

}


function drawPupil(circleX, circleY, circleDiameter){
  fill(0);
  circle(circleX, circleY, circleDiameter);
}

function drawSclera(circleX, circleY, circleDiameter){
  fill(0)
  circle(circleX, circleY, circleDiameter);
}

function drawLine(x1, y1, x2, y2){
  strokeWeight(17);
  line(x1, y1, x2, y2);
}

function drawIris(circleX, circleY, circleDiameter){
  circle(circleX, circleY, circleDiameter+(micVar/10))
}

function drawSemicircle (x1, y1, x2, y2, x3, y3, x4, y4){
  strokeWeight(8)
  noFill()
  curve(x1, y1, x2, y2, x3, y3, x4, y4)
}

function movePupil(r, g, b){
  fill(0);
  if (Crosseye == 0) {
    drawPupil(width*.2, height*.3,width*.07,);
    drawPupil(width*.8, height*.3,width*.07,);
} else if (Crosseye == 1) {
    drawPupil(width*.23, height*.3,width*.07,);
    drawPupil(width*.77, height*.3,width*.07,);
    }
}

class wart {
  constructor (xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.t = int(random(360));
    this.s = random(-.1, .1);
  }
  display() {
    push()
    translate( this.xpos, this.ypos);
    rotate(this.t);
    noStroke()
    fill(15, 79, 29)
    ellipse(10, 10, 25)
  noFill();
stroke(255, 102, 0);
stroke(0, 0, 0);
    pop()
  }
  move() {
    this.t = this.t + this.s;
  }
}
