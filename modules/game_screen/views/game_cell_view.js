define(['backbone','underscore','jquery'],function(Backbone,_,$){

	var CellView = Backbone.View.extend({
		initialize: function(opts){
			opts = opts || {};
			this.$cell = $(this.model.get('image'));
			this.$cell.attr('class', this.model.get('cssClass'));
			this.$cell.width(64);
			this.$cell.height(64);
			this.listenTo(this.model,'change:active',this.onActiveChange,this);
		},
		render: function(){
			this.$el.append(this.$cell);
		},
		remove: function(){
			this.$cell.remove();
		},
		onActiveChange: function(){
			var isActive = this.model.get('active');
			this.$cell.toggleClass('active');
		}
	});

	return CellView;
})