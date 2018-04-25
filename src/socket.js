let io = require("socket.io-client");
const { Player } = require("./models/player");

class Socket {
	
	constructor(url, bot) {
		this.bot = bot
		this.socket = io.connect(url, { reconnect: true, query: "teamName=" + this.bot.teamName });
		this.configureListeners();
	}

	configureListeners() {
		 this.socket.on('connect', function() {
			// console.log("connect");
			this.socket.on("state", data => {
				// console.log("state");
			});

			this.socket.on("requestAction", function(data) {
				this.onRequestAction(data)
			}.bind(this));

			this.socket.on("requestBet", function(data) {
				this.onRequestBet(data)
			}.bind(this));
		}.bind(this));
	}

	

	onRequestBet(state) {
		console.log("BET")
		let you = new Player(state.players.filter(player => {
				return player.teamName === this.bot.teamName
			})[0]);
		let others = state.players.filter(player => player.teamName != this.bot.teamName).map(data => new Player(data));

		this.sendData("bet", {amount: this.bot.bet(you,  others)});
	}

	onRequestAction(state) {
		console.log("ACTION")
		let you = new Player(state.players.filter(player => {
			return player.teamName === this.bot.teamName
		})[0]);
		let others = state.players.filter(player => player.teamName != this.bot.teamName).map(data => new Player(data));
		let dealer = state.dealersHand;

		this.sendData("action", {action: this.bot.action(you, dealer, others)});
	}


	sendData(event, data) {
		this.socket.emit(event, data);
	}

	// Actions

	sendAction(action) {
		let data = {
    		"action" : action
		};
		this.sendData("action", data);
	}

	sendBet(amount) {
		let data = {
    		"amount" : amount
		};
		this.sendData("bet", data);
	}

}

module.exports = {
	Socket
};