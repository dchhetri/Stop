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
		}
	});
	return GameCellModel;
})