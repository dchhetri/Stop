define(['backbone',
	'layoutManager',
	'text!../templates/default_screen_view.html',
	'../models/game_board',
	'css!../css/default_screen_view.css',
	'../utils/game_board_active_cell_picker',
	'./game_cell_view'],

	function(Backbone,LayoutManager,ScreenViewTmpl,GameBoard,Css,GameBoardCellPicker,GameCellView){

	var gameBoardCellPicker = new GameBoardCellPicker();

	var GameBoardCollectionView = Backbone.View.extend({
		template: _.template(ScreenViewTmpl),
		initialize: function(options){
			console.log("MonitorView::initialize");
			_.bindAll(this,'render','update');
			this.gameBoard = new GameBoard();
			this.$template = $(this.template());
			this.$northContainer = this.$template.find('#north-container');
			this.$eastContainer = this.$template.find("#east-container");
			this.$southContainer = this.$template.find("#south-container");
			this.$westContainer = this.$template.find("#west-container")
			this.gameCellViews = [];
			this.animationRequestId = null;
			this.gameBoard.fetch({
				success: this.update
			});		
			var self = this;
			//FOR DEBUGGING 
			$("body").keypress(function(e){
				if(e.which == 32){
					if(self.animationRequestId){
						console.log('CANCELing...');
						window.cancelAnimationFrame(self.animationRequestId);
						self.animationRequestId = null;
					}
					else{
						console.log('REGISTERING...');
						self.animationRequestId =  window.requestAnimationFrame(_.bind(self._onAnimate,self));

					}
				}
			});
		},
		update: function(){
			var self = this;
			function onPopulate(gameBoard,indices,$container){
				_.each(indices, function(boardIndex){
					self.gameCellViews.push(new GameCellView({
						model: gameBoard.at(boardIndex),
						el: $container
					}));
				});
			}
			onPopulate(this.gameBoard,this.gameBoard.getNorthBoardIndices(),this.$northContainer);
			onPopulate(this.gameBoard,this.gameBoard.getSouthBoardIndices(),this.$southContainer);
			onPopulate(this.gameBoard,this.gameBoard.getEastBoardIndices(),this.$eastContainer);
			onPopulate(this.gameBoard,this.gameBoard.getWestBoardIndices(),this.$westContainer);
			this.render();
		},

		render: function(){
			console.log('in render');
			this.clearContainer();
			this.$el.append(this.$template);
			this.$template.layout(this.getLayoutConfig());
			this.onEachGameCell('render');
		},
		clearContainer: function(){
			console.log('in clearContainer');
			this.onEachGameCell('remove');
			this.$northContainer.empty();
			this.$southContainer.empty();
			this.$eastContainer.empty();
			this.$westContainer.empty();
		},
		onEachGameCell: function(memberFunctionName,args){
			_.each(this.gameCellViews, function(cell){
				cell[memberFunctionName](args);
			})
		},
		animate: function(){
			console.log('animate called');
			this.registerAnimation();
		},
		getLayoutConfig: function(){
			return {
				applyDemoStyles: false,
				spacing_open: 0.0,
				north__size: 0.20,				
				south__size: 0.20,
				east__size: 0.1667,
				west__size:	0.1667
			}
		},
		registerAnimation: function(){
			if(this.animationRequestId){
				window.cancelAnimationFrame(this.animationRequestId);
				this.animationRequestId = null;
			}
			this.animationRequestId =  window.requestAnimationFrame(_.bind(this._onAnimate,this));
		},
		_onAnimate: function(dt){
			console.log('in _onAnimate, dt =', dt);
			//mark random cell active
			var randomCellInfo = gameBoardCellPicker.getNextActiveCell();
			console.log('randomCellInfo = ',randomCellInfo);
			var indiceFuncs = [this.gameBoard.getNorthBoardIndices,this.gameBoard.getEastBoardIndices,this.gameBoard.getSouthBoardIndices,this.gameBoard.getWestBoardIndices];
			var randomCellIndex = indiceFuncs[randomCellInfo.direction]()[randomCellInfo.index];
			var randomCellModel = this.gameBoard.at(randomCellIndex);
			if(!randomCellModel){
				debugger;
			}
			if(this._lastActiveModel){this._lastActiveModel.set('active',false);}
			randomCellModel.set('active',true);
			this._lastActiveModel = randomCellModel;
			this.registerAnimation();
		}

	});
	return GameBoardCollectionView;
})