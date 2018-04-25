let io = require("socket.io-client");
const { Player } = require("./models/player");

class Socket {
	
	constructor(url, bot) {
		this.bot = bot
		if (bot.teamName === "your_team_here") {
			console.log();
			console.log();
			console.log();
			console.log('\x1b[31m','You need to change your team name in bot.js file!');
			console.log();
			console.log();
			console.log();
			return
		}
		this.socket = io.connect(url, { reconnect: true, query: "teamName=" + this.bot.teamName });
		this.configureListeners();
	}

	configureListeners() {
		 this.socket.on('connect', function() {
			// console.log("connect");
			this.socket.on("state", data => {
				this.onRequestState(data)
			});

			this.socket.on("requestAction", function(data) {
				this.onRequestAction(data)
			}.bind(this));

			this.socket.on("requestBet", function(data) {
				this.onRequestBet(data)
			}.bind(this));

			this.socket.on("round", function() {
				this.onRound();
			}.bind(this))

		}.bind(this));
	}

	

	onRequestBet(state) {
		let you = new Player(state.players.filter(player => {
				return player.teamName === this.bot.teamName
			})[0]);
		// let others = state.players.filter(player => player.teamName != this.bot.teamName).map(data => new Player(data));
		this.sendData("bet", {amount: this.bot.bet(you)});
	}

	onRequestAction(state) {

		let you = new Player(state.players.filter(player => {
			return player.teamName === this.bot.teamName
		})[0]);
		let dealer = state.dealersHand.hand.cards.filter(card => card != null && card.value > 1);
		this.sendData("action", {action: this.bot.action(you, dealer)});
	}

	onRequestState(state) {

		if (state.players.filter(player => {return player.teamName === this.bot.teamName}).length > 0) {
			let you = new Player(state.players.filter(player => {
				return player.teamName === this.bot.teamName
			})[0]);
			let dealer = state.dealersHand.hand.cards.filter(card => card != null && card.value > 1);
			let others = state.players.filter(player => player.teamName != this.bot.teamName).map(data => new Player(data));

			this.bot.state(you, dealer, others)
		} else {
			
			console.log(JSON.stringify(state));
			let you = new Player(state.deadPlayers.filter(player => {
				return player.teamName === this.bot.teamName
			})[0]);
			console.log(" - \n\n YOUR ARE DEAD -")
			console.log(" - YOUR SURVIVED " + you.numberOfRounds + " ROUNDS -")
			console.log(" - \n\n PLEASE PRESS CTRL+C - \n\n")
		}
		
		
	}

	onRound() {
		console.log("\n\n - ROUND OVER - \n\n")
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