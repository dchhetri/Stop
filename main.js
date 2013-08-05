require.config({
	paths: {
	  jquery: './libs/jquery-2.0.3',
	  underscore: './libs/underscore',
	  backbone: './libs/backbone',

	  //plugins
	  text: './plugins/text',
	},
	shim: {
		"underscore": {
			exports: '_'
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});    		