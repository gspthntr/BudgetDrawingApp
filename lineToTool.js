class LineToTool{
	constructor(){
		this.icon = "assets/lineTo.jpg";
		this.name = "LineTo";
		this.startMouseX = -1;
		this.startMouseY = -1;
		this.drawing = false;
	}
	

	draw(){
   
        if(!mouseOnCanvas(canvas)){
            return;
        }
        
		if(mouseIsPressed){
			if(this.startMouseX == -1){
				this.startMouseX = mouseX;
				this.startMouseY = mouseY;
				this.drawing = true;
				loadPixels();
			}

			else{
				updatePixels();
				line(this.startMouseX, this.startMouseY, mouseX, mouseY);
			}

		} else if(this.drawing){
			this.drawing = false;
			this.startMouseX = -1;
			this.startMouseY = -1;
		}
	}
}
