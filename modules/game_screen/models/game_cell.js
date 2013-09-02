define(['backbone','css!../css/game_cell.css'],

function(Backbone,CellCss){
	console.log('CellCss = ', CellCss);
	var GameCellModel = Backbone.Model.extend({
		defaults:{
			image: {},
			value: "",
			cssClass: 'game-cell',
			active: false
		},
		initialize: function(){
			this.on('change:active',this.onActiveChange,this);
		},
		onActiveChange: function(){
			//TODO: create a GameCellView class that handles the changes to class attributes, ex on change:active need to add .active class
		}

	});
	return GameCellModel;
})