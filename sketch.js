//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var canvas = null;
let slider;
let overlay;
let freehandTool;
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

  // Create overlay for mirror tool to ensure red line don't persist
  overlay = createGraphics(width, height);

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  // toolbox.addTool(new FreehandTool());
  // freehandTool.setupUI();
  freehandTool = new FreehandTool();
  toolbox.addTool(freehandTool);

  freehandTool.setupUI();
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCan());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new FixedShapes());
  undoManager = new UndoManager();
  clear();
  // Save the initial blank state
  undoManager.saveState();
  select("#undoButton").mouseClicked(() => {
    if (typeof undoManager !== "undefined") {
      undoManager.undo();
    }
  });
  console.log(canvas.size()); // p5.js size (in canvas pixels)
  console.log(canvas.elt.getBoundingClientRect()); // true screen size + offset
}

// let firstFrameCaptured = false;
function draw() {
  if ("draw" in toolbox.selectedTool) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }

  if (toolbox.selectedTool.name !== "mirrorDraw") {
    overlay.clear();
  } else {
    image(overlay, 0, 0); // Only show overlay when in mirrorDraw
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
