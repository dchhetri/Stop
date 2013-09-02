define(['backbone','./views/default_screen_view'],
	function(Backbone,DefaultScreenView){

	var ScreenView = Backbone.View.extend({
		initialize: function(options){
			this.monitor = new DefaultScreenView({
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