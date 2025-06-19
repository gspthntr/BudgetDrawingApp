//Displays and handles the colour palette.
class ColourPalette {
	constructor(){
		
	//a list of web colour strings
	this.colours = [
		"black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	];
	//make the start colour be black
	this.selectedColour = "black";

	this.colourClick = (event) => {
		//remove the old border
		let current = select("#" + this.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		let c = event.target.id.split("Swatch")[0];

		//set the selected colour and fill and stroke
		this.selectedColour = c;
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		select("#" + c + "Swatch").style("border", "2px solid blue");
	}

	this.loadColours();
	}
// var self = this;

	

	//load in the colours
	loadColours() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (let i = 0; i < this.colours.length; i++) {
			let colourID = this.colours[i] + "Swatch";

			//using p5.dom add the swatch to the palette and set its background colour
			//to be the colour value.
			let colourSwatch = createDiv(`${this.colours[i]}`)
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(this.colourClick);
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	//call the loadColours function now it is declared
}