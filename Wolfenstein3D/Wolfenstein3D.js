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

var mapWidth = map[0].length;
var mapHeight = map.length;
var miniMapScale = 8;	// How many pixels to draw a map block
var CIRCLE = Math.PI * 2;

class Player {
	constructor(x,y,direction,rotation,speed,moveSpeed,rotaSpeed) {
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.rotation = rotation;
		this.speed = speed;
		this.moveSpeed = moveSpeed;
		this.rotaSpeed = rotaSpeed;
	}

	Move() {
		var moveStep = player.speed * player.moveSpeed;
		player.rotation += player.direction * player.rotaSpeed;

		// make sure the angle is between 0 and 360 degrees
		while (player.rotation < 0) 
			player.rotation += CIRCLE;
		while (player.rotation >= CIRCLE) 
			player.rotation -= CIRCLE;

		// Calculate player next position
		var newX = player.x + Math.cos(player.rotation) * moveStep;
		var newY = player.y + Math.sin(player.rotation) * moveStep;

		// update position
		if (isValidPosition(newX,newY)) {
			player.x = newX;
			player.y = newY;
		}
	}

	Render() {
		var miniMap = $("minimap");
		var miniMapObjects = $("minimapobjects");
	
		var objectCtx = miniMapObjects.getContext("2d");
		miniMapObjects.width = miniMapObjects.width;
		//objectCtx.clearRect(0,0,miniMap.width,miniMap.height);
	
		objectCtx.fillRect(		// draw a dot at the current player position
			player.x * miniMapScale - 2, 
			player.y * miniMapScale - 2,
			4, 4
		);
		objectCtx.beginPath();
		objectCtx.moveTo(player.x * miniMapScale, player.y * miniMapScale);
		objectCtx.lineTo(
			(player.x + Math.cos(player.rotation) * 4) * miniMapScale,
			(player.y + Math.sin(player.rotation) * 4) * miniMapScale
		);
		objectCtx.closePath();
		objectCtx.stroke();
	}
}

const player = new Player(25, 10, 0, 0, 0, 0.18, 6 * Math.PI / 180);

function isValidPosition(x,y) {
	if (x < 0 || x > mapWidth|| y < 0 || y > mapHeight)
		return false;
	return (map[Math.floor(y)][Math.floor(x)] == 0);
}

function init() {

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
				player.speed = 1;
				break;
			// Down. Move player backwards
			case 40:
				player.speed = -1;
				break;
			// Left.
			case 37:
				player.direction = -1;
				break;
			// Rigth.
			case 39:
				player.direction = 1;
				break;
		}
	}
	document.onkeyup = function(e) {
		e = e || window.event;
		
		switch(e.keyCode) {
			case 38:
			case 40:
				player.speed = 0;
				break;
			case 37:
			case 39:
				player.direction = 0;
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
	player.Render();
}

function gameCycle() {
	player.Move();
	player.Render();
	setTimeout(gameCycle,1000/30);	// 30 fps
}

setTimeout(init, 1);