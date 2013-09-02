define(['backbone',
	'layoutManager',
	'text!../templates/default_screen_view.html',
	'../models/game_board',
	'css!../css/default_screen_view.css'],

	function(Backbone,LayoutManager,ScreenViewTmpl,GameBoard,Css){

	var ScreenView = Backbone.View.extend({
		template: _.template(ScreenViewTmpl),
		initialize: function(options){
			console.log("MonitorView::initialize");
			_.bindAll(this,'render','populate');
			this.gameBoard = new GameBoard();
			this.$northContainer = null;
			this.$eastContainer = null;
			this.$southContainer = null;
			this.$westContainer = null;
			this.animationRequestId = null;
			this.render();
			this.gameBoard.fetch({
				success: this.populate
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
						this.animationRequestId =  window.requestAnimationFrame(_.bind(self._onAnimate,self));
					}
				}
			});
		},
		populate: function(imageList){
			var self = this;
			//populate helper
			function onPopulate(gameBoard,indices,$container){
				_.each(indices, function(boardIndex){
					var imageModel = gameBoard.at(boardIndex);
					var $cell = $(imageModel.get('image'));
					$cell.attr('class',imageModel.get('cssClass'));
					//TODO: adjust images to be 64x64 to avoid resizing
					$cell.width(64);
					$cell.height(64);
					$container.append($cell);
				});
			}
			onPopulate(this.gameBoard,this.gameBoard.getNorthBoardIndices(),this.$northContainer);
			onPopulate(this.gameBoard,this.gameBoard.getSouthBoardIndices(),this.$southContainer);
			onPopulate(this.gameBoard,this.gameBoard.getEastBoardIndices(),this.$eastContainer);
			onPopulate(this.gameBoard,this.gameBoard.getWestBoardIndices(),this.$westContainer);
		},

		render: function(){
			this.clear();
			var $tmpl = $(this.template());
			this.$el.append($tmpl);
			$tmpl.layout(this.getLayoutConfig());
			//keep reference to the containers
			this.$northContainer = $("#north-container");
			this.$eastContainer = $("#east-container");
			this.$southContainer = $("#south-container");
			this.$westContainer = $("#west-container");
		},
		clear: function(){
			this.$el.empty();
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

			var randomIndex = _.random(this.gameBoard.models.length);

			this.registerAnimation();
		}

	});
	return ScreenView;
})