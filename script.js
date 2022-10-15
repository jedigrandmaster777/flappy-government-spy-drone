const canvas = pjs.createCanvas();

let paused = false; //paused starts out as false, to draw the screen at first, and is then set to true

let bird = {
	real: false,
 	y: 200,
	motion: 0,
	score: 0
};
let pipe = {
	x: 450,
 	y: 200
};

pjs.draw = function(){
	if(paused) return;

	canvas.background(0, 153, 204);
	canvas.ctx.drawImage(document.getElementById("background"), 0, 150);

	canvas.fill(255, 255, 0);
  	
	canvas.ctx.drawImage(document.getElementById("drone"), 100 - 15, bird.y - 15, 30, 30);
	canvas.ctx.drawImage(document.getElementById("pipe"), pipe.x - 55, pipe.y);
	canvas.ctx.drawImage(document.getElementById("pipeUpsideDown"), pipe.x - 55, pipe.y - 470);
	//canvas.rect(100 - 10, bird.y - 10, 20, 20);
  	canvas.fill(0, 255, 0);
	//canvas.rect(pipe.x - 50, pipe.y, 50, 400);
	//canvas.rect(pipe.x - 50, 0, 50, pipe.y - 100);
	
	bird.y += bird.motion;
	bird.motion++;
	
	if(bird.y > 400){
		bird = {
			real: false,
			y: 200,
			motion: 0,
			score: 0
		};
		pipe = {
			x: 450,
			y: 200
		};
		paused = true;
	}
	pipe.x -= 5;
	if(pipe.x < 0){
		pipe.x = 450;
		pipe.y = pjs.random(100, 300);
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
				x: 450,
				y: 200
			};
			paused = true
		}
	}
}

pjs.draw(); //explained above
paused = true;

pjs.keyPressed = function(e){
	paused = false;
	
	bird.motion = -10;
}
pjs.mouseClicked = function(){
	paused = false;
	
	bird.motion = -10;
}
