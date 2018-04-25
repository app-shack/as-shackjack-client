const {Deck, Card} = require("./deck")
const reducer = (accumulator, currentValue) => accumulator + currentValue.value;

class Hand {
	
	constructor() {
		this.cards = []
	}

	cardCount() {
		return this.cards.length
	}

	addCard(card) {
		this.cards.push(card);
	}

	sum() {
		return this.cards.reduce(reducer, 0)
	}

	isBust() {
		return this.sum() > 21
	}
}

module.exports = {
	Hand
};