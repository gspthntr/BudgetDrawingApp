//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var canvas = null;
let slider;

//spray can object literal
sprayCan = {
  name: "sprayCanTool",
  icon: "assets/sprayCan.jpg",
  points: 13,
  spread: 10,
  draw: function () {
    if (!mouseOnCanvas(canvas)) {
      return;
    }

    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed) {
      for (var i = 0; i < this.points; i++) {
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  },
};

let undoManager;
function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");
  canvas = c;
  background(255);

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(sprayCan);
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new FixedShapes());
  undoManager = new UndoManager();
  // Save the initial blank state
  undoManager.saveState();
  select("#undoButton").mouseClicked(() => {
    if (typeof undoManager !== "undefined") {
      undoManager.undo();
    }
  });
  console.log(canvas.size()); // p5.js size (in canvas pixels)
  console.log(canvas.elt.getBoundingClientRect()); // true screen size + offset
  // slider = createSlider(0, 360, 3699).position(100, 100);
  // createButton();
}

// let firstFrameCaptured = false;
function draw() {
  if ("draw" in toolbox.selectedTool) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }

	if (undoManager?.needsSnapshot) {
    undoManager.saveState();
  }
}

function mousePressed() {
  //call mousePressed from the selected tool if
  //the selected tool has a mousePressed() method
  if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
    toolbox.selectedTool.mousePressed();
  }
}

// function mouseReleased() {
//   console.log("mouseReleased detected");
//   if (toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
//     toolbox.selectedTool.mouseReleased();
//   }
// }
function mouseReleased() {
  console.log("mouseReleased detected");

  const tool = toolbox.selectedTool;
  console.log("Selected tool:", tool.name);
  console.log("Has mouseReleased:", typeof tool.mouseReleased);

  if (tool && typeof tool.mouseReleased === "function") {
    tool.mouseReleased();
  }
}

//Note: you can add other similar standard methods e.g. mouseReleased()
//and call mouseReleased() in each selected tool
