const { Hand } = require("./hand");

class Player {
	
	constructor(data) {
		this.teamName = data.teamName;
		this.bankRoll = data.bankRoll;
		this.hand = new Hand(data.hand.cards);
		this.bet = data.bet;
		this.numberOfRounds = data.numberOfRounds;
	}

}

module.exports = {
    Player
};