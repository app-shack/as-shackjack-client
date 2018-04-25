var config = require('./settings');
var utils = require('./utils');

class Card {
	constructor(value, suit, realValue=null) {
		this.value = value;
		this.realValue = realValue;
		this.suit = suit;
		this.isHidden = false
	}

	static hiddenCard() {
		return new Card(-1, "", -1)
	}
	conceal() {
		this.isHidden = true
	}

	reveal() {
		this.isHidden = false	
	}
}


class Deck {
	constructor() {
		this.cards = Deck.standardDeck();
	}

	static standardDeck() {
		var suits = ["hearts", "diamonds", "clubs", "spades"];
		var cards = [];
		for (var i = 0; i < config.numberOfDecks; i++) {
			for (var j = 2; j < 15; j++) {
				for (var k = 0; k < suits.length; k++) {
					if (j > 10) {
						if (j === 14) {
							var card = new Card(11, suits[k], j);	
						} else {
							var card = new Card(10, suits[k], j);		
						}
					} else {
						var card = new Card(j, suits[k], j);	
					}
					
					cards.push(card);	
				}
			}
		}
		utils.shuffle(cards);
		return cards
	}

	cardCount() {
		return this.cards.length
	}

	pickOne() {
		if (this.cards.length === 0) {
			this.cards = Deck.standardDeck();
		}
		return this.cards.shift();
	}

	pickTwo() {
		return [this.pickOne(), this.pickOne()]
	}

	pickTwoForDealer() {
		var cards =  [this.pickOne(), this.pickOne()]
		return cards;
	}
}

module.exports = {
    Card,
    Deck
};