class SprayCan {
  constructor() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
  }

  draw() {
    if (!mouseOnCanvas(canvas)) {
      return;
    }

    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed) {
      for (let i = 0; i < this.points; i++) {
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  }

  mouseReleased() {
    if (!mouseOnCanvas(canvas)) return; // Ensure we're on canvas

    if (typeof undoManager !== "undefined") {
      console.log("🕒 Marking snapshot for next frame");
      undoManager.markForSnapshot();
    }
  }
}
