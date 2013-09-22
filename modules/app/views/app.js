
define(['jquery','backbone','text!../templates/app.html','css!../css/app.css','../../game_screen/main.js'],
 function($,Backbone,AppTemplate,AppCss,GameScreen){
	'use strict';
	var AppView = Backbone.View.extend({
		template: _.template(AppTemplate),
		initialize: function(){
			console.log('AppView::initialize');
			_.bindAll(this,'render');
			this.render();
		},
		render: function(){
			console.log('AppView::render');
			var model = {msg: 'Hello World'}
			this.$el.html(this.template(model));
			this.gameScreen = new GameScreen({el: $("#monitor-screen")});
		}
	});

	return AppView;
});