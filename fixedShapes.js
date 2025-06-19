class FixedShapes {
  constructor() {
    this.icon = "";
    this.name = "fixedShape";
    this.colour = "black";
    this.isDropdown = true;
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.drawing = false;
    // this.outerRad = dist(mouseX, mouseY, this, p);
    // this.innerRad = this.outerRad / 2;
  }

  setShape(shapeName) {
	this.currentShape = shapeName;
}
  draw() {
    if (!mouseOnCanvas(canvas)) {
      return;
    }
    let colour;
    if (mouseIsPressed) {
      if (this.startMouseX == -1) {
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        this.pos = createVector(mouseX, mouseY);
        this.drawing = true;
        loadPixels();
      } else {
        updatePixels();
        this.outerRad = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        this.innerRad = this.outerRad / 2;
        let xDragDist = mouseX - this.pos.x;
        let yDragDist = mouseY - this.pos.y;
        let angle = atan2(yDragDist, xDragDist);
        let distFromClick = dist(this.pos.x, this.pos.y, mouseX, mouseY)
        if(this.currentShape === "Star"){
          this.drawStar(this.pos.x, this.pos.y, this.innerRad, this.outerRad, angle);
        }else if(this.currentShape === "Circle"){
          this.drawCircle(this.pos.x, this.pos.y, distFromClick);
        }else if(this.currentShape === "Triangle"){
          this.drawTriangle(this.pos.x, this.pos.y, distFromClick, angle);
        }else if(this.currentShape === "Square"){
          this.drawSquare(this.pos.x, this.pos.y, distFromClick, angle);
        }else if(this.currentShape === "Penis"){
          this.drawPenis(this.pos.x, this.pos.y, distFromClick, angle);
        }
      }
    } else if (this.drawing) {
      this.drawing = false;
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }
  drawStar(x, y, innerRad, outerRad, rotation = 0) {
    let angle = TWO_PI / 5;
    let halfAngle = angle / 2;
    push();
    translate(x, y);
    rotate(rotation);
    
    beginShape();
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "rgba(0, 0, 255)";
    for (let a = 0; a < TWO_PI; a += angle) {
      let outerPoint = a - HALF_PI;
      let innerPoint = a + halfAngle - HALF_PI;
      let cx = cos(outerPoint) * outerRad;
      let cy = sin(outerPoint) * outerRad;
      vertex(cx, cy);
      cx = cos(innerPoint) * innerRad;
      cy = sin(innerPoint) * innerRad;
      vertex(cx, cy);
    }
    endShape(CLOSE);
    pop();
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0)";
  }

  drawCircle(x, y, rad) {
	push();
	noStroke();
	ellipse(x, y, rad * 2);
	pop();
}

  drawTriangle(x, y, rad, rotation = 0) {
	push();
	translate(x, y);
	rotate(rotation);
	noStroke();
	beginShape();
	for (let i = 0; i < 3; i++) {
		let angle = TWO_PI * i / 3 - HALF_PI;
		let vx = cos(angle) * rad;
		let vy = sin(angle) * rad;
		vertex(vx, vy);
	}
	endShape(CLOSE);
	pop();
}

drawSquare(x, y, rad, rotation = 0) {
	push();
	translate(x, y);
	rotate(rotation);
	rectMode(CENTER);
	noStroke();
	rect(0, 0, rad * 2, rad * 2);
	pop();
}

drawPenis(x, y, radius, rotation = 0) {
	push();
	translate(x, y);
	rotate(rotation);
	noStroke();

	let shaftWidth = radius * 0.6;
	let shaftHeight = radius * 2;
	rectMode(CENTER);
	rect(0, -shaftHeight / 2, shaftWidth, shaftHeight);

	arc(0, -shaftHeight, shaftWidth, shaftWidth, PI, 0, CHORD);

	let ballOffset = shaftWidth * 0.8;
	ellipse(-ballOffset, radius * 0.1, radius, radius);
	ellipse(ballOffset, radius * 0.1, radius, radius);

	pop();
}
}
