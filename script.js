var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.querySelector("#pickedColorDisplay");
var resultDisplay = document.querySelector("#resultDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var difficulty = "hard";

init();

function init(){
	//Mode buttons event listener
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			
			if(this.textContent === "Easy"){
				numSquares = 3;
			}
			else if(this.textContent === "Extreme"){
				difficulty = "extreme"
				numSquares = 6;
			}
			else {
				numSquares = 6;
			}
			// Turnary operator, replaces if statements
			difficulty = this.textContent === "Extreme" ? "extreme" : "";
			
			reset();
		})
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click",function(){
			//grabbed color of clicked squared
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if(clickedColor === pickedColor){
				resultDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play again?";
			}
			else{
				resultDisplay.textContent = "Try again!";
				this.style.backgroundColor = "#232323"
			}
		})
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	pickedColorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].classList.remove("hide");
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].classList.add("hide");
		}
	}
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "steelblue";
	resultDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		if(i !== 0 && difficulty === "extreme"){
			arr.push(extremeColor([color[1], color[2], color[3]]));
		}
		else{//generate random color push into array
			var color = randomColor();
			arr.push(color[0]);
		}
	}	
	//return array
	return arr;
}

function randomColor() {
		//pick a red from 0 - 255
		var r = Math.floor(Math.random() * 256);
		//pick a green from 0 - 255
		var g = Math.floor(Math.random() * 256);
		//pick a blue from 0 - 255
		var b = Math.floor(Math.random() * 256);
		return ["rgb(" + r + ", " + g + ", " + b + ")", r, g, b];
}

function extremeNum(){
	var num = Math.floor(Math.random()*40) + 1; // this will get a number between 1 and 99;
	num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
	return num;
}

function extremeColor(arr) {
	for(var i = 0; i < arr.length; i++){
		arr[i] = arr[i] + extremeNum();
		arr[i] = arr[i] < 0 ? 0 : arr[i];
		arr[i] = arr[i] > 255 ? 255 : arr[i];
	}
	return "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
}

// easyButton.addEventListener("click", function(){
// 	easyButton.classList.add("selected");
// 	hardButton.classList.remove("selected");
// 	numSquares = 3;
// 	//generate 3 new colors
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		}
// 		else{
// 			squares[i].classList.add("hide");
// 		}
// 	}
// })

// hardButton.addEventListener("click", function(){
// 	hardButton.classList.add("selected");
// 	easyButton.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();

// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].classList.remove("hide");
// 	}
// })