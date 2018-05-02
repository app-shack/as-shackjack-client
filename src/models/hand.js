const cardReducer = (accumulator, currentValue) => accumulator + currentValue.value;

class Hand {
	
	constructor(cards = []) {
		this.cards = cards;
	}
	
	addCard(card) {
		this.cards.push(card);
	}

	count() {
		return this.cards.length;
	}

	sum() {
        let handValue = this.cards.reduce(cardReducer, 0)
        let aces = this.cards.filter(card => card.value === 11)

        for(let i = 0; i < aces.length; i++){
            if (handValue > 21) {
                handValue -= 10
            }
        }
        return handValue
	}

	isBust() {
		return this.sum() > 21;
	}

}

module.exports = {
	Hand
};