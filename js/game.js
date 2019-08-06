
	var game = new Game(2000, 1000, 'dark maze');
	var player, boy, floor;
	var keyboard, up, down, left, right;
	
	var audioContext, track, panner
	var drip;
	
	var wall;
	var smallWall = [];
	var maze;
	
function preload() {
	floor = new Sprite("img/floor.png");
	player = new Sprite("img/boy.png", 64, 64);
	wall = new Sprite("img/DungeonFloor.jpg");


	audioContext = new AudioContext();
	drip = new Audio("sound/water-drops-daniel_simon.wav");
	track = audioContext.createMediaElementSource(drip);
	panner = new PannerNode(audioContext);
	
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();

	var direction;
	var velocY;
	var velocX;
}

function create() {
	
		
		floor = floor.create(0, 0, 1000, 1000);
		
		
		createMaze();
		wall1 = wall.create(100, 100, 10, 100);
		wall.setImmovable(true);
		
		boy = player.create(100, 100);

		boy.addAnimation('back', [0, 1, 2, 3], 10);
		boy.addAnimation('left', [4, 5, 6, 7], 10);
		boy.addAnimation('right', [8, 9, 10, 11], 10);
		boy.addAnimation('forward', [12, 13, 14, 15], 10);
		boy.addAnimation('still', [0], 1);

		track.connect(panner).connect(audioContext.destination);
		drip.play();
}


function update() {
		velocY = 0;
		velocX = 0;
		if (left.isDown()) {
			direction = 'left';
			velocX += -100;
		}
		
		if (right.isDown()) {
			direction = 'right'
			velocX += 100
		}
		
		if (up.isDown()) {
			direction = 'forward'
			velocY += -100
		}
		
		if (down.isDown()) {
			direction = 'back'
			velocY += 100
		}
		
		if (velocY == 0 && velocX == 0){
			direction = 'still';
		}
		boy.playAnimation(direction);
		boy.setVelocityX(velocX);
		boy.setVelocityY(velocY);
		game.checkCollision(boy, wall);

		var x = 100 - (boy.getX() / 5);
		var y = 100 - (boy.getY() / 5);
		
		panner.positionX.value = x;
		panner.positionY.value = y;
}

function createMaze() {
	
	var walllength = 20;
	maze = '\
	11111111111111111111\n\
	10000000000000100001\n\
	10000000000000100001\n\
	10011110010000100001\n\
	10010000010000111001\n\
	11111111111111111111\n\
	11111111111111111111\n\
	11111111111111111111\n\
	11111111111111111111\n\
	11111111111111111111\n\
	11111111111111111111'
	
	maze = maze.split('\n');
	
	for (var i = 0; i < maze.length; i++) {
		maze[i].split('');
	}
	
	for (var y = 0; y < maze.length; y++) {
		for (var x = 0; x < maze[y].length; x++) {
			if (maze[y][x] == '1') {
				wall.create(x*walllength, y*walllength, 20, 20)
			}
		}
	}
	
	
	
	
	
}