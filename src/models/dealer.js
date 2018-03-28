const { Card } = require("./card");

class Dealer {

	constructor(data) {
		this.cards = data.cards.map(card => new Card(card));
	}

}

module.exports = {
    Dealer
};