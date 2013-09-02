define(['backbone','./game_cell','require'],

function(Backbone,GameCellModel,require){

	var GameBoard = Backbone.Collection.extend({
		model: GameCellModel,
		url: "/gameboard",
		initialize: function(){
		},
		sync: function(method, model, options){
			console.log('GameBoard::sync',arguments);
			switch(method){
				case "create": break;
				case "read": 
					var collection = this;
					require(['images'], function(ImageResource){
						var imageResourceModel = new ImageResource();
						var imageList = imageResourceModel.get('images');
						console.log('image resource loaded' , imageList);
						//var loadedImages = arguments;
						collection.reset(imageList);
						//window.app = {imageResource: imageList};
						//window.imageResource = imageResourceModel;
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