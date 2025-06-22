class FreehandTool {
  constructor() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    this.qpreviousMouseX = -1;
    this.qpreviousMouseY = -1;
    this.slider = null;
    this.strokeWeight = 1;
  }

  setupUI() {
    // Find the icon that was inserted by toolbox.js
    const sidebarIcon = select("#freehandsideBarItem"); // matches the id used in toolbox
    if (!sidebarIcon) {
      console.warn("Freehand tool icon not found");
      return;
    }

    // Avoid adding slider multiple times
    if (select("#freehandSlider")) return;

    // Create slider beside the icon
    this.slider = createSlider(1, 50, this.strokeWeight);
    this.slider.id("freehandSlider");
    this.slider.style("transform", "rotate(270deg)");
    this.slider.style("width", "100px");
    this.slider.style("margin-left", "10px");
    this.slider.parent(sidebarIcon.parent()); // parent of the icon (wrapper div)

    this.slider.input(() => {
      this.strokeWeight = this.slider.value();
    });
  }

  draw() {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "SELECT" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }
    const activeTag = document.activeElement.tagName;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(activeTag)) return;
    if (!mouseOnCanvas(canvas)) {
      return;
    }

    //if the mouse is pressed
    if (mouseIsPressed) {
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (this.qpreviousMouseX == -1) {
        this.qpreviousMouseX = mouseX;
        this.qpreviousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from
      //there to the current mouse location
      else {
        strokeWeight(this.strokeWeight);
        line(this.qpreviousMouseX, this.qpreviousMouseY, mouseX, mouseY);
        this.qpreviousMouseX = mouseX;
        this.qpreviousMouseY = mouseY;
      }
    }
    //if the user has released the mouse we want to set the previousMouse values
    //back to -1.
    //try and comment out these lines and see what happens!
    else {
      this.qpreviousMouseX = -1;
      this.qpreviousMouseY = -1;
    }
  }
  mouseReleased() {
    if (!mouseOnCanvas(canvas)) return; // Ensure we're on canvas

    if (typeof undoManager !== "undefined") {
      console.log("🕒 Marking snapshot for next frame");
      undoManager.markForSnapshot();
    }
  }

  //This method will be called by this.selectTool() in toolbox.js
  //when this tool is selected
  //It is useful to setup the GUI control for this tool
  populateOptions() {
    console.log("Freehand tool selected");
    if (toolbox.selectedTool.name === this.name) {
      this.setupUI();
    }
  }

  //This method will be called by this.selectTool() in toolbox.js
  //when this tool is unselected
  //It is useful to remove the GUI control for this tool
  unselectTool() {
    console.log("Freehand tool Unselected");
    const existingSlider = select(`#${this.name}Slider`);
    if (existingSlider) existingSlider.remove();
  }
}
