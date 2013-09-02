/* Populates the board into some predefined sequences*/
define([],function(){
	function BoardPopulator(opts){
		opts = opts || {};
		var mode = opts.mode || '1'; //mode1, mode2, mode3 -- 3 different board configurations

		var orderingMap = {
			/*
				4000STAR CAR 500 CLOWN LEFT 1000
				750							STAR
				DICE						2000
				JACPOT						CLOWN
				100 1000STAR RIGHT 500 1000 DOKNEY
			*/
			'1': {
				'north': [8,11,1,13,9,17],
				'east': [4,14,6],
				'south': [16,7,10,2,0,15],
				'west': [3,12,5],
			}
		}
		this.setMode = function(newMode){ mode = newMode;}
		this.getMode = function(){return mode;}

		this.getBoardMappings = function(){
			return orderingMap[mode]
		}
		this.getNorthIndices = function(){
			return this.getBoardMappings()['north'];
		}
		this.getSouthIndices = function(){
			return this.getBoardMappings()['south'];
		}
		this.getEastIndices = function(){
			return this.getBoardMappings()['east'];
		}
		this.getWestIndices = function(){
			return this.getBoardMappings()['west'];
		}
	}

	return BoardPopulator;
})