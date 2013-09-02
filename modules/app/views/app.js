
define(['jquery','backbone','text!../templates/app.html','css!../css/app.css'],
 function($,Backbone,AppTemplate,AppCss){
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
		}
	});

	return AppView;
});