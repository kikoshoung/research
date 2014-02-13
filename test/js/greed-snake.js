(function(){

	var defaultConfig = {
			freq: 42,
			dir: 0,
			length: 6,
			corners: [],
			gridSize: 10,
			position: [0, 0]
		},
		dirs = [0, 1, 2, 3]; // top, right, bottom, left

	// Constructor
	function GreedSnake(options){
		this.options = options || {};
		this.init();
	}

	// Prototype of GreedSnake
	GreedSnake.prototype = {
		
		init: function(){
			this.setConfig();
			this.ctx = this.canvas.getContext('2d');
			this.setSnake();
			this.drawFrame();
		},

		setConfig: function(){
			var oldOptions = this.options;

			for(var i in defaultConfig){
				if(defaultConfig.hasOwnProperty(i)){
					this[i] = oldOptions[i] || defaultConfig[i];
				}
			}
			this.canvas = oldOptions.canvas;

			delete this.options; 
			
			console.log(this)
		},

		setSnake: function(){
			var canvas = this.canvas,
				position = [canvas.width / 2, canvas.height / 2];

			this.position = position;
		},

		drawFrame: function(){
			var freq = this.freq,
				self = this;

			self.clearCanvas();
			self.drawSnake();

			setTimeout(function(){
				self.drawFrame();
			}, freq);
		},

		clearCanvas: function(){
			var canvas = this.canvas,
				ctx = this.ctx;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},

		drawSnake: function(){
			var canvas = this.canvas,
				ctx = this.ctx,
				offset = this.gridSize,
				position = this.position,
				length = this.length,
				corners = this.corners.slice(),
				cornerlen = corners.length,
				gap;
console.log(position)

			for(var i = 0, len = corners.length; i < len; i++){
				switch(corners[i].dir){
					case 0:
						position[1] = position[1] + offset;
						break;
					case 1:
						position[0] = position[0] + offset;
						break;
					case 2:
						position[1] = position[1] - offset;
						break;
					case 3:
						position[0] = position[0] - offset;
						break;
				}
			ctx.lineTo(position[0], position[1]);


			}


			
			// ctx.lineTo((position[0] = position[0] + offset), (position[1] = position[1] + offset));
			ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
			ctx.lineWidth = this.gridSize; 
			ctx.stroke();
		},

		getCornerGap: function(dir, corners){
			switch(dir){
				case 0:
					corners
					position[1] = position[1] + offset;
					break;
				case 1:
					position[0] = position[0] + offset;
					break;
				case 2:
					position[1] = position[1] - offset;
					break;
				case 3:
					position[0] = position[0] - offset;
					break;
			}
		},

		addCorner: function(dir, position){
			this.corners.push({dir: dir, pos: position});
		}
	}

	window.GreedSnake = GreedSnake;
})();