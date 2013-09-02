define(function(){

	function createLink(src) {
		var link = window.document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = src;
		return link;
	};

    return {
        load : function(name, req, onLoad, config){
        	var link = createLink(name);
        	var head = window.document.getElementsByTagName('head')[0];
			head.appendChild(link);
			onLoad(link);
        }
    };

});