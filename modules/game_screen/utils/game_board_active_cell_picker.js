define([],function(){

	var gameboard;

	function GameBoardActiveCellPicker(opts){
		opts = opts || {};
		gameboard = opts.gameboard;
		var probabilityMatrix = [
			[0.05,0.225,0.225,0.225,0.225,0.05],//north
			[0.10,0.267,0.267,0.267,0.10],//east #NOTE east relistically only contains 3 elems, the corners belongs to nort/south
			[0.05,0.225,0.225,0.225,0.225,0.05],//south 
			[0.10,0.267,0.267,0.267,0.10] //west #NOTE see note for east
		];
 		
		this.getNextActiveCell = function(){
			var d = Math.floor( Math.random() * 4 );
			var dbgInfo = ['north','east','south','west'];
			var probabilityList = probabilityMatrix[d];
			var accumulation = 0.0;
			var sumProbabilityList = probabilityList.map(function(p){return accumulation += p; });
			console.log('sumP = ' + sumProbabilityList);
			var randomPoint = Math.random();
			var randomIndex = -1;
			for(var i = 0; i < sumProbabilityList.length; ++i){
				if(randomPoint < sumProbabilityList[i]){
					randomIndex = i;
					break;
				}
			}
			console.log('direction = ' + dbgInfo[d] + " : " + d);
			console.log('index = ' +  randomIndex);

			if(d == 0 || d == 2){//north or south
				console.log('CheckPoint 0')
				return {direction: d, index: randomIndex};
			}else if(d == 1){//east
				if(randomIndex == 0){
					console.log('CheckPoint A')
					return {direction: 0, index: 5}; //last elem of north (top right corner)
				}else if(randomIndex == 4){
					console.log('CheckPoint B')
					return {direction: 2, index: 5}; //last elem of south (bottom right corner)
				}else{
					console.log('CheckPoint C')
					return {direction: d, index: randomIndex - 1}; //somewhere in the middle
				}
			}else{//west
				if(randomIndex == 0){
					console.log('CheckPoint D')
					return {direction: 0, index: 0}; //top left corner
				}else if(randomIndex == 4){
					console.log('CheckPoint E')
					return {direction: 2, index: 0}; //bottom left corner
				}else{
					console.log('CheckPoint F')
					return {direction: d, index: randomIndex - 1}; //somewhere in the middle.
				}
			}
		}
	};

	return GameBoardActiveCellPicker;
})