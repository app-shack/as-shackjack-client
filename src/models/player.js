const { Hand } = require("./hand");

class Player {
	
	constructor(data) {
		this.teamName = data.teamName;
		this.bankRoll = data.initialCredit;
		this.hand = new Hand(data.hand);
	}

}

module.exports = {
    Player
};