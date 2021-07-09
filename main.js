// Create canvas variable
var canvas = new fabric.Canvas("myCanvas")

//Set initial positions for ball and hole images.
block_image_width = 10;
block_image_height = 10;

var ball_x = 0;
var ball_y = 0;
var hole_x = Math.floor(Math.random()*(canvas.width-block_image_width)/block_image_width)*block_image_width;
var hole_y = Math.floor(Math.random()*(canvas.height-block_image_height)/block_image_height)*block_image_height;



function load_img() {
	// write code to Upload golf image on the canvas
	fabric.Image.fromURL("golf-h.png", function (Img) {
		hole_obj = Img;
		hole_obj.scaleToWidth(50);
		hole_obj.scaleToHeight(50);
		hole_obj.set({
			top: hole_y,
			left: hole_x
		});
		canvas.add(hole_obj);
	});
	new_image();
}

function new_image() {
	// write code to Upload ball image on canvas
	fabric.Image.fromURL("ball.png", function (Img) {
		ball_obj = Img;
		ball_obj.scaleToWidth(50);
		ball_obj.scaleToHeight(50);
		ball_obj.set({
			top: ball_y,
			left: ball_x
		});
		canvas.add(ball_obj);
	});
}

window.addEventListener("keydown", my_keydown);

function refresh() {
	console.log("Ball position X=" + ball_x + " , Y=" + ball_y);
	canvas.remove(ball_obj);
	new_image();
}

function my_keydown(e) {
	keyPressed = e.keyCode;
	console.log(keyPressed);
	/* Check the coordinates of the ball and hole images to finish the game. 
	And id coordinates matches them remove ball image, 
	display "GAME OVER!!!" 
	and make canvas border 'red'. */
	if (ball_x == hole_x && ball_y == hole_y) {
		canvas.remove(ball_obj);
		document.getElementById("hd3").innerHTML = "Yes !! You have hit the goal.";
		document.getElementById("hd6").style.display='none';
		document.getElementById("myCanvas").style.borderColor = "red";
		GameOver();
	} else {
		if (keyPressed == '38') {
			up();
			console.log("up");
		}
		if (keyPressed == '40') {
			down();
			console.log("down");
		}
		if (keyPressed == '37') {
			left();
			console.log("left");
		}
		if (keyPressed == '39') {
			right();
			console.log("right");
		}
	}

	function up() {
		// Write a code to move ball upward.
		ball_y -= block_image_height;
		refresh();
	}

	function down() {
		// Write a code to move ball downward.
		ball_y += block_image_height;
		refresh();

	}

	function left() {
		if (ball_x > 5) {
			// Write a code to move ball left side.
			ball_x -= block_image_width;
			refresh();
		}
	}

	function right() {
		if (ball_x <= 1050) {
			// Write a code to move ball right side.
			ball_x += block_image_width;
			refresh();
		}
	}
}

function GameOver(){
	var Text = new fabric.Text("Game Over",{
		top: 200,
		left: 400,
		fontWeight :100,
		fontFamily:"Impact",
		fill:'red'
	});
	
	canvas.add(Text);
	
	Text.animate('scaleX',3,{
		duration: 4000,
		onChange: canvas.renderAll.bind(canvas)
	});

	Text.animate('scaleY',3,{
		duration: 4000,
		onChange: canvas.renderAll.bind(canvas)
	});

	setTimeout(() => {
		Text.animate('scaleX',1,{
			duration: 4000,
			onChange: canvas.renderAll.bind(canvas)
		});
		Text.animate('scaleY',1,{
			duration: 4000,
			onChange: canvas.renderAll.bind(canvas)
		});
		
	}, 4000);
}

