require.config({
	baseUrl: '',
	paths: {
	  jquery: './libs/jquery-2.0.3',
	  underscore: './libs/underscore',
	  backbone: './libs/backbone',
	  layoutManager: './libs/layout_manager',
	  resources: './resources/',
	  images: './modules/resource/images',
	  //plugins
	  text: './plugins/text',
	  image: 'https://raw.github.com/millermedeiros/requirejs-plugins/master/src/image',
	  css: './libs/css'
	},
	shim: {
		"underscore": {
			exports: '_'
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		'layoutManager': {
			deps: ['text!./libs/layout_manager.css'],
			exports: 'LayoutManager'
		}
	}
});    		