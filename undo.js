class UndoManager {
  constructor(limit = 50) {
    this.stack = [];
    this.limit = limit;
  }

   markForSnapshot() {
    this.needsSnapshot = true;
  }

  saveState() {
    if (!canvas) return;
    const snapshot = get(); // Get full canvas snapshot
    this.stack.push(snapshot);

    // Limit stack size
    if (this.stack.length > this.limit) {
      this.stack.shift();
    }
	this.needsSnapshot = false;
    console.log(`State saved. Stack size: ${this.stack.length}`);
  }

  undo() {
    if (this.stack.length < 2) {
      console.log("No more states to undo.");
      return;
    }

    // Remove the most recent state
    this.stack.pop();

    // Restore previous state
    const previous = this.stack[this.stack.length - 1];
    clear();
    image(previous, 0, 0);
    loadPixels(); // Refresh pixel buffer
    console.log("Undo executed.");
  }
}
