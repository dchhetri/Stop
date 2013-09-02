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
				success: this.populate//_.bind(populate,this)
			});		
			var self = this;
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
		populate: function(container){
			//var indiceList = Array.apply(0, Array(this.gameBoard.length)).map(function(value,index) { return index; })
			var indiceList = _.shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
			var appendAndPop = _.bind(function($cont,maxCount,normalizeWidth,normalizeHeight){
				var i = indiceList.pop();
				var imageModel = this.gameBoard.at(i);
				var $img = $(imageModel.get('image'));
				$img.attr('class',imageModel.get('cssClass'))
				var outerWidthOffset = $img.outerWidth() - $img.width();
				var outerHeightOffset = $img.outerHeight() - $img.height();
				console.log('offsets = ' ,outerWidthOffset,outerHeightOffset);
				var w = normalizeWidth ? ($cont.width()) / maxCount : $cont.width();
				var h = normalizeHeight? ($cont.height()) / maxCount : $cont.height();
				$img.width(w);
				$img.height(h);
				
				$cont.append($img);
			},this);
			//start populating
			_(6).times(_.bind(function(){appendAndPop(this.$northContainer,6,true,false)},this) );
			_(6).times(_.bind(function(){appendAndPop(this.$southContainer,6,true,false)},this) );
			_(3).times(_.bind(function(){appendAndPop(this.$eastContainer,3,false,true)},this) );
			_(3).times(_.bind(function(n){appendAndPop(this.$westContainer,3,false,true)},this) );

			//this.animate();
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
				north__size: 0.15,				
				east__size: 0.15,
				south__size: 0.15,
				west__size:	0.15
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