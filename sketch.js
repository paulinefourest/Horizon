// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

var cols, rows;
var scl = 15;
var w = 1400;
var h = 1000;
var flying = 0;
var terrain = [];

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = (w / scl);
  rows = (h / scl);
 
  frameRate(12);
  t = 0;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  
  flying -= 0.025;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.15;
  }
    
  noStroke();
  translate(0, 50);
  background(255, 50+(sin(t*4)*50), 150);

  
  
  rotateX(PI / 3);
  t = t + 0.01;
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      
      //fill(0, 150-(float(y)*8), 255-(float(y)*4));
      fill(50+(cos(t*4)*50), 180-(float(y)*4), 255-(float(y)*2));
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
          
    }
    endShape();
  }
   
  // small sun
  push();
  rotateX((-PI)*(t/2));
  translate(width/6, -height/16);
  fill(255,50,0);
  sphere(100);
  pop();
  
   //big sun
  push();
  rotateX(-PI*t/6);
  translate(width/2, -height/2);
  fill(255, 140, 0);
  sphere(200);
  
  pop();
}

