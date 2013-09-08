define(['backbone','./views/default_screen_view'],
	function(Backbone,GameBoardView){

	var ScreenView = Backbone.View.extend({
		initialize: function(options){
			this.monitor = new GameBoardView({
				el: this.$el
			});
			this.render();
		},
		render: function(){
			this.monitor.render();
		}
	});
	return ScreenView;
})