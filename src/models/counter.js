const numOfDecs = 1;
const deckSize = 52;

class Counter {
	constructor() {
		this.deck = numOfDecs*deckSize
		this.count = 0
		this.sum = 0
	}

	addHand(cards) {
		cards.map(card => {
			if (card) {
				this.countCard(card.value)
			}
		})
	}

	addCard(card) {
		if (card) {
			this.countCard(card.value)
		}
	}

	countCard(value) {
		if (value > 0) {
			this.deck -= 1
			this.sum += value
			if (value < 7) {
				this.count += 1
			} else if (value > 9) {
				this.count -= 1
			}

			if (this.deck === 0) {
				this.deck = numOfDecs*deckSize
				this.count = 0
			}
		}
		console.log("sum --- : " + this.sum)
	}

	trueCount() {
		return this.count/(this.deck/52)
	}
}

module.exports = {
    Counter
};