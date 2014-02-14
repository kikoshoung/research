(function(){
	var defaultOptions = {
			freq: 200,
			gridWidth: 20,
			sLen: 10,
			dir: 1,
			fail: false
		},
		dirs = [0, 1, 2, 3]; // top, right, bottom, left

	$.fn.jSnake = function(options){
		var $panel = $(this);

		options = options || {};

		setOptions();
		setGrids();
		setDefaultSnake();
		setFood();

		start();

		function setOptions(){
			var oldOptions = options,
				width, height, gridSzie;

			for(var i in defaultOptions){
				if(defaultOptions.hasOwnProperty(i)){
					options[i] = oldOptions[i] || defaultOptions[i];
				}
			}

			width = options.width = $panel.data('width');
			height = options.height = $panel.data('height');
			gridWidth = options.gridWidth;
			options.gridSzie = [Math.floor(width / gridWidth), Math.floor(height / gridWidth)],
			options.snakeNodes = [];
		}

		function setGrids(){
			var gridSzie = options.gridSzie,
				gridsHtml = '',
				isSnake;

			for(var i = 0, rows = gridSzie[1]; i < rows; i++){
				for(var j = 0, cols = gridSzie[0]; j < cols; j++){
					var isSnake = false;
					gridsHtml += '<span class="grid" id="'+ i +'-'+ j +'" data-dir="-1" style="width: '+ gridWidth +'px; height: '+ gridWidth +'px;"></span>'
				}
			}

			$panel.css({
				width: options.width + 'px',
				height: options.height + 'px'
			}).html(gridsHtml);

			options.$grids = $panel.find('.grid');
		}

		function setDefaultSnake(){
			var snakeNodes = options.snakeNodes,
				gridSzie = options.gridSzie,
				gridWidth = options.gridWidth,
				center = [Math.floor(gridSzie[0] / 2), Math.floor(gridSzie[1] / 2)],
				node;

			for(var i = 0, len = options.sLen; i < len; i++){
				node = $('#'+ center[0] +'-'+ (center[1] - i)).addClass('snake').data('dir', options.dir);
				snakeNodes.push(node);
			}
		}

		function setFood(){
			var freeNodes = $panel.find('.grid').not('.snake'),
				len = freeNodes.length,
				randomIndex = Math.floor(Math.random() * len),
				randomNode = $(freeNodes[randomIndex]);

			randomNode.addClass('food').data({
				role: 'food'
			});
		}

		function start(){
			bindKey();
			toNextFrame();
		}

		function bindKey(){
			$(document).keydown(function(e){
				var oldDir = options.snakeNodes[0].data('dir'),
					dir, preventedDir;

				switch(e.keyCode){
					case 38:
						preventedDir = 2;
						dir = 0;
						break;
					case 39:
						preventedDir = 3;
						dir = 1;
						break;
					case 40:
						preventedDir = 0;
						dir = 2;
						break;
					case 37:
						preventedDir = 1;
						dir = 3;
						break;
				}

				if(oldDir == preventedDir) return;
				options.snakeNodes[0].data({
					role: 'corner',
					changeDir: dir
				});
			});
		}

		function toNextFrame(){
			var nextHead = getNextNode(options.snakeNodes[0]);

			// nodeIsBlocked(nextHead);
			// isFood();

			setNextFrame();
			if(!options.fail){
				options.timer = setTimeout(function(){
					toNextFrame()
				}, options.freq)
			}
		}

		function hasFood(){
			var oldNode = options.snakeNodes[0],
				nextNode = getNextNode(oldNode);

			if(nextNode.data('role') == 'food'){
				nextNode.data({
					dir: oldNode.dir,
					role: ''
				}).removeClass('food')
				.addClass('snake');
				addLength(nextNode);
			}
		}

		function setNextFrame(){
			var snakeNodes = options.snakeNodes,
				newSnakeNodes = [];

			for(var i = 0, len = snakeNodes.length; i < len; i++){
				var curNode = snakeNodes[i];

				if(curNode.data('role') == 'corner'){
					curNode.data('dir', curNode.data('changeDir'));
					if(i == len - 1) curNode.data('role', '');
				}

				nextNode = getNextNode(curNode);
				if(nextNode && !(nextNode.hasClass('snake') && i == 0)){
					curNode.removeClass('snake');
					nextNode.addClass('snake');
					newSnakeNodes.push(nextNode);
				} else {
					gameover();
					return;
				}
			}

			options.snakeNodes = newSnakeNodes;
		}

		function getNextNode(head){
			var headID = head[0].id.split('-'),
				headDir =  head.data('dir'),
				gridSzie = options.gridSzie,
				fail = false,
				nextNode;			

			switch(+headDir){
				case 0:
					if(--headID[0] < 0) fail = true;
					break;
				case 1:
					if(++headID[1] >= gridSzie[1]) fail = true;
					break;
				case 2:
					if(++headID[0] >= gridSzie[0]) fail = true;
					break;
				case 3:
					if(--headID[1] < 0) fail = true;
					break;
			}

			if(fail) {
				return false;
			}

			return $('#'+ headID.join('-')).data('dir', headDir);
		}

		function addLength(foodNode){
			options.snakeNodes.push(foodNode)
		}

		function gameover(){
			options.fail = true;
			alert('撞墙啦！')
		}
	}
})();