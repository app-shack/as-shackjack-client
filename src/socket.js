let io = require("socket.io-client");

class Socket {
	
	constructor(url, teamName) {
		this.socket = io.connect(url, { reconnect: true, query: "teamName=" + teamName });
		
		this.configureListeners();
	}

	configureListeners() {
		this.socket.on("connect", function () {
		    console.log("Connected to socket with id: " + this.socket.id);
		}.bind(this));

		this.socket.on("state", function(data) {
			console.log("State from socket with data: " + JSON.stringify(data));
		}.bind(this));

		this.socket.on("participants_updated", function(data) {
			console.log("Participants updated with data: " + JSON.stringify(data));
		}.bind(this));

		this.socket.on("await_action", function() {
			console.log("Awaiting action");
		}.bind(this));

		this.socket.on("disconnect", function() {
			console.log("Disconnected from socket");
		}.bind(this));		
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