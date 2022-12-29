const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const images = {
	background: document.getElementById("background"),
	drone: document.getElementById("drone"),
	pipe: document.getElementById("pipe"),
	pipeUpsideDown: document.getElementById("pipeUpsideDown")
}
let paused = false; //paused starts out as false, to draw the screen at first, and is then set to true

let bird = {
	real: false,
 	y: 200,
	motion: 0,
	score: 0
};
let pipe = {
	x: canvas.width - images.pipe.width,
 	y: 200
};

const draw = function(){
	if(paused) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(images.background, 0, 150); //TODO make this support canvas resizing

	ctx.fillStyle = "rgb(255, 255, 0)";
  	
	ctx.drawImage(images.drone, 100 - 15, bird.y - 15, 30, 30);
	ctx.drawImage(images.pipe, pipe.x - 55, pipe.y);
	ctx.drawImage(images.pipeUpsideDown, pipe.x - 55, pipe.y - 470);
	
  	ctx.fillStyle = "rgb(0, 255, 0)";
	
	bird.y += bird.motion;
	bird.motion++;
	
	if(bird.y > canvas.height){
		bird = {
			real: false,
			y: 200,
			motion: 0,
			score: 0
		};
		pipe = {
			x: canvas.width + images.pipe.width,
			y: 200
		};
		paused = true;
	}
	pipe.x -= 5;
	if(pipe.x < 0){
		pipe.x = canvas.width + images.pipe.width;
		pipe.y = Math.floor(Math.random() * (canvas.height - 200) + 100); //300 (100 less than 400) was the original constant, min is 100, so subtract 200
		bird.score++;
	}
	
	if(!(bird.y + 10 < pipe.y && bird.y - 10 > pipe.y - 100)){
  		if(100 + 10 > pipe.x - 50 && 100 - 10 < pipe.x){
			bird = {
				real: false,
				y: 200,
				motion: 0,
				score: 0
			};
			pipe = {
				x: canvas.width + images.pipe.width,
				y: 200
			};
			paused = true
		}
	}
}
setInterval(draw, 30);


draw(); //explained above
paused = true;

window.onkeydown = function(e){
	paused = false;
	
	bird.motion = -10;
}
document.onmousedown = function(){
	paused = false;
	
	bird.motion = -10;
}
