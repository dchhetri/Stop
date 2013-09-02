define(['backbone','./game_cell','require','../utils/game_board_populator'],

function(Backbone,GameCellModel,require,GameBoardPopulator){

	//private helper object for GameBoard
	var boardPopulator = new GameBoardPopulator();
	var mode = 1;

	var GameBoard = Backbone.Collection.extend({
		model: GameCellModel,
		url: "/gameboard",
		initialize: function(configs){
			configs = configs || {};
			var mode = configs.mode || 1;
			boardPopulator.setMode(mode);
		},
		setBoardMode: function(mode){
			boardPopulator.setMode(mode);
		},
		getBoardMode: function(){
			return boardPopulator.getMode();
		},
		getSouthBoardIndices: function(){
			return boardPopulator.getSouthIndices();
		},
		getNorthBoardIndices: function(){
			return boardPopulator.getNorthIndices();
		},
		getEastBoardIndices: function(){
			return boardPopulator.getEastIndices();
		},
		getWestBoardIndices: function(){
			return boardPopulator.getWestIndices();
		},

		sync: function(method, model, options){
			console.log('GameBoard::sync',arguments);
			switch(method){
				case "create": break;
				case "read": 
					var self = this;
					require(['images'], function(ImageResource){
						var imageResourceModel = new ImageResource();
						var imageList = imageResourceModel.get('images');
						self.reset(imageList);
						options.success(imageList);
					});
				break;
				case "update":  break;
				case "delete": break;
			}
		}

	});
	return GameBoard;
})