var $ = function(id) { return document.getElementById(id); };
var dc = function(tag) { return document.createElement(tag); };

var map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,3,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,2,0,2,2,2,2,2,2,2,2,0,2,4,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,3,3,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var mapWidth = 0;		// Number of map blocks in x-direction
var mapHeight = 0;		// Number of map blocks in y-direction
var miniMapScale = 8;	// How many pixels to draw a map block
var CIRCLE = Math.PI * 2;

var Player = {
	x : 10,
	y : 15,
	direction : 0,
	rotation : 0,
	speed : 0,
	moveSpeed : 0.18,
	rotaSpeed : 6 * Math.PI / 180
}

function movePlayer() {
	var moveStep = Player.speed * Player.moveSpeed;
	Player.rotation += Player.direction * Player.rotaSpeed;

	// make sure the angle is between 0 and 360 degrees
	while (Player.rotation < 0) 
		Player.rotation += CIRCLE;
	while (Player.rotation >= CIRCLE) 
		Player.rotation -= CIRCLE;

	// Calculate player next position
	var newX = Player.x + Math.cos(Player.rotation) * moveStep;
	var newY = Player.y + Math.sin(Player.rotation) * moveStep;

	// update position
	Player.x = newX;
	Player.y = newY;
}

function init() {
	mapWidth = map[0].length;
	mapHeight = map.length;

	bindKeys();

	drawMap();

	gameCycle();
}

function bindKeys() {
	document.onkeydown = function(e) {
		e = e || window.event;
		
		switch(e.keyCode) {
			// Up. Move player forward
			case 38:
				Player.speed = 1;
				break;
			// Down. Move player backwards
			case 40:
				Player.speed = -1;
				break;
			// Left.
			case 37:
				Player.direction = -1;
				break;
			// Rigth.
			case 39:
				Player.direction = 1;
				break;
		}
	}
	document.onkeyup = function(e) {
		e = e || window.event;
		
		switch(e.keyCode) {
			case 38:
			case 40:
				Player.speed = 0;
				break;
			case 37:
			case 39:
				Player.direction = 0;
				break;
		}
	}
}

function drawMap() {
	// Draw the topdown view minimap
	var miniMap = $('minimap');
	// Resize the internal canvas dimensions
	miniMap.width = mapWidth * miniMapScale;
	miniMap.height = mapHeight * miniMapScale;
	// Resize the canvas CSS dimensions
	miniMap.style.width = (mapWidth * miniMapScale) + 'px';
	miniMap.style.height = (mapHeight * miniMapScale) + 'px';

	// Loop through all blocks on the map
	var ctx = miniMap.getContext('2d');
	for (var y=0; y < mapHeight; y++) {
		for (var x=0; x < mapWidth; x++) {
			var wall = map[y][x];
			// If there is a wall block at this (x,y)…
			if (wall > 0) {
				ctx.fillStyle = 'rgb(150,150,150)';
				// …Then draw a block on the minimap
				ctx.fillRect(
					x * miniMapScale,
					y * miniMapScale,
					miniMapScale, miniMapScale
				);
			}
		}
	}
	drawPlayer();
}

function drawPlayer() {

	var miniMap = $("minimap");
	var miniMapObjects = $("minimapobjects");

	var objectCtx = miniMapObjects.getContext("2d");
	miniMapObjects.width = miniMapObjects.width;
	//objectCtx.clearRect(0,0,miniMap.width,miniMap.height);

	objectCtx.fillRect(		// draw a dot at the current player position
		Player.x * miniMapScale - 2, 
		Player.y * miniMapScale - 2,
		4, 4
	);
	objectCtx.beginPath();
	objectCtx.moveTo(Player.x * miniMapScale, Player.y * miniMapScale);
	objectCtx.lineTo(
		(Player.x + Math.cos(Player.rotation) * 4) * miniMapScale,
		(Player.y + Math.sin(Player.rotation) * 4) * miniMapScale
	);
	objectCtx.closePath();
	objectCtx.stroke();
}

function gameCycle() {
	movePlayer();
	drawPlayer();
	setTimeout(gameCycle,1000/30);	// 30 fps
}

setTimeout(init, 1);