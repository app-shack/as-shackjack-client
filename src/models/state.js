const { Dealer } = require("./dealer"),
	{ Player } = require("./player");

class State {
	
	constructor(data) {
		this.players = data.players.map(player => new Player(player));
		this.dealer = new Dealer(data.dealer);
		this.currentPlayer = data.current_player;
	}

	isCurrentPlayersTurn(playerId) {
		return this.currentPlayer == playerId;
 	}
	
}

module.exports = {
    State
};