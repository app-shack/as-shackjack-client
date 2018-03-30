const cardReducer = (accumulator, currentValue) => accumulator + currentValue.value;

class Hand {
	
	constructor() {
		this.cards = [];
	}
	
	addCard(card) {
		this.cards.push(card);
	}

	count() {
		return this.cards.length;
	}

	sum() {
		return this.cards.reduce(cardReducer, 0);
	}

	isBust() {
		return this.sum() > 21;
	}

}

module.exports = {
	Hand
};