define(['./views/app', '../game_screen/main.js'],function(App,MonitorScreen){
	var app = new App({
		el: '#app',
	});
	var monitor = new MonitorScreen({
		el: $("#monitor-screen")
	});
})