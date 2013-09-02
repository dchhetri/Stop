define(['backbone',
	'image!resources/images/100_dollar.png', 
	'image!resources/images/500_dollar.png',
	'image!resources/images/500_dollar.png?bust',
	'image!resources/images/750_dollar.png',
	'image!resources/images/1000_dollar.png',
	'image!resources/images/1000_dollar.png?bust',
	'image!resources/images/2000_dollar.png',
	'image!resources/images/1000_dollar_plus_spin.png',
	'image!resources/images/4000_dollar_plus_spin.png',
	'image!resources/images/arrow_left_2_space.png',
	'image!resources/images/arrow_right_2_space.png',
	'image!resources/images/car_prize.png',
	'image!resources/images/donkey.png',
	'image!resources/images/clown.png',
	'image!resources/images/clown.png?bust',
	'image!resources/images/jackpot.png',
	'image!resources/images/dice.png',
	'image!resources/images/spin_plus_random_star.png', 
	]
	,function(Backbone,
			  img100,img500_1,img500_2,img750,img1000_1,img1000_2,img2000,  //money
			  img1000Spin,img4000Spin, //money with spin
			  imgArrowLeft,imgArrowRight, //move arrow
			  imgCarPrize, //prize 1
			  imgDonkey, //bogus prize
			  imgClown1, //robber
			  imgClown2, //robber #2
			  imgJackpot, //jack motha fuking pot
			  imgDice, //random cell
			  imgSpinStar //extra spin plus random cell
			  ){

	var ImageResources = Backbone.Model.extend({
		defaults: {
			images: [],
			properties: {	MONEY: "MONEY", //raw dough
							EXTRA_SPIN: "EXTRA_SPIN", //another turn
							ARROW:   "ARROW", //move left/right n spaces
							PRIZE:   "PRIZE", //motha fuking prize son
							BURGLAR: "BURGLAR", //take all of yo moneyyy
							RANDOM:  "RANDOM", //random prize from predetermined list
							JACKPOT: "JACKPOT", //ding ding ding jackpot
						  }
		},
		initialize: function(){
			this.baseImageUrl = "../resources/images/";
			var property = this.get('properties');

			//Note if order changed, update ordering in ../utils/game_board_populator.js as well
			var images = [
				this._makeMoneyImageModel(img100,[100]),
				this._makeMoneyImageModel(img500_1,[500]),
				this._makeMoneyImageModel(img500_2,[5000]),
				this._makeMoneyImageModel(img750,[750]),
				this._makeMoneyImageModel(img1000_1,[1000]),
				this._makeMoneyImageModel(img1000_2,[1000]),
				this._makeMoneyImageModel(img2000,[2000]),
				this._makeMoneyImageModel(img1000Spin,[1000,1],[property.EXTRA_SPIN]),
				this._makeMoneyImageModel(img4000Spin,[4000,1],[property.EXTRA_SPIN]),
				this._makeImageModel(imgArrowLeft,[-2],[property.ARROW]),
				this._makeImageModel(imgArrowRight,[2],[property.ARROW]),
				this._makeImageModel(imgCarPrize,[2550],[property.PRIZE]),
				this._makeImageModel(imgDonkey,[10],[property.PRIZE]),
				this._makeImageModel(imgClown1,[property.BURGLAR],[property.BURGLAR]),
				this._makeImageModel(imgClown2,[property.BURGLAR],[property.BURGLAR]),
				this._makeImageModel(imgJackpot,[property.JACKPOT],[property.JACKPOT]),
				this._makeImageModel(imgDice,[property.RANDOM],[property.RANDOM]),
				this._makeImageModel(imgSpinStar,[1,property.RANDOM],[property.EXTRA_SPIN,property.RANDOM]) 
			];
			this.set({images: images},{silent:true});
		},
		_makeMoneyImageModel: function(imgResource,values,prop){
			var property = $.merge([this.get('properties').MONEY], prop || []);
			return this._makeImageModel(imgResource,values,property);
		},
		_makeImageModel: function(imgResource,values,prop){
			return {image: imgResource, property: prop, values: values};
		}
	});

	return ImageResources;
})