const canvas = pjs.createCanvas();
const score = document.getElementById("score");


let bird = {
	real: false,
  y: 200,
  motion: 0,
  score: 0
};
let pipe = {
	x: 400,
  y: 200
};

pjs.draw = function(){
	score.textContent = `Score: ${bird.score}`;

	canvas.background(255, 255, 255);

	canvas.fill(255, 255, 0);
  
	canvas.rect(100 - 10, bird.y - 10, 20, 20);
  
  canvas.fill(0, 255, 0);
  canvas.rect(pipe.x - 50, pipe.y, 50, 400);
  canvas.rect(pipe.x - 50, 0, 50, pipe.y - 100);
  
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
			x: 400,
 			y: 200
		};
  }
  
  pipe.x -= 5;
  if(pipe.x < 0){
  	pipe.x = 400;
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
				x: 400,
 				y: 200
			};
    }
  }
}

pjs.keyPressed = function(e){
	bird.motion = -10;
}
