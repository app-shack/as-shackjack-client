var app = require('express')("0.0.0.0");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = require("./settings");
var events = require('events');
const {Player} = require("./player");

app.get('/start_game', function (req, res) {
	res.sendFile(__dirname + '/html/index3.html');
});

function log(msg) {
	console.log(msg)
}

class Socket {

	constructor() {

		this.eventEmitter = new events.EventEmitter();

		server.listen(3000);
		this.nodes = [] 
		this.listeners = {}

		io.on('connection', function (socket) {
			
			let teamName = socket.handshake.query.teamName

			socket.on("gameBegin", function() {
				this.eventEmitter.emit("onGameBegin")
			}.bind(this));

			if (teamName) {
				let socketId = socket.id
				log("connect: " + teamName)
				if (teamName == "AS_ShackJack_GameMonitor") {
					this.gameMasterSocketId = socketId
					io.to(this.gameMasterSocketId).emit("playersUpdated", this.nodes.map(node =>  node.name))
					return
				}

				this.addParticipant(teamName, socketId)

				socket.on('disconnect', function(reason) {
					this.removeParticipant(teamName);
				}.bind(this));
	  		}
	  	}.bind(this));
	
	}

	stateUpdated(state) {
		io.emit("state", state);
	}

	roundOver(round) {
		io.emit("round", round);
	}
	
	sendOnPlayersOrderUpdatedEvent(players) {
		io.to(this.gameMasterSocketId).emit("onPlayersOrderUpdated", players)
	}

	requestBet(target, gameState) {
		return new Promise(function(done) {
			log("REQUEST BET FROM [" + target.teamName + "] .. ");
			let _target = this.nodes.filter(node => node.name === target.teamName)[0]
			let socket = io.of("/").connected[_target.id]
			var timer = setTimeout(function() { 
				let data = {amount: 10}
				done(data)
				io.to(this.gameMasterSocketId).emit("bet", {
					target: target.teamName,
					action: data.amount
				})
			}, 5000);
			socket.once("bet", (data) => {
				clearTimeout(timer)
				log("["+target.teamName+"] bets " + data.amount);
				done(data)
				io.to(this.gameMasterSocketId).emit("bet", {
					target: target.teamName,
					action: data.amount
				})
			})
			io.to(_target.id).emit("requestBet", gameState);
			io.to(this.gameMasterSocketId).emit("requestBet", {
				target: target.teamName
			})
		}.bind(this))
	}

	requestAction(target, gameState) {
		return new Promise(function(done) {
			log("REQUEST ACTION FROM [" + target.teamName + "] .. ");
			let _target = this.nodes.filter(node => node.name === target.teamName)[0]
			let socket = io.of("/").connected[_target.id]
			var timer = setTimeout(function() { 
				let data = {action: "stand"}
				done(data)
				io.to(this.gameMasterSocketId).emit("action", {
					target: target.teamName,
					action: data.action
				})
			}, 5000);
			socket.once("action", (data) => {
				clearTimeout(timer)				
				log("["+target.teamName+"] " + data.action + "s");
				done(data)
				io.to(this.gameMasterSocketId).emit("action", {
					target: target.teamName,
					action: data.action
				})
			})
			io.to(_target.id).emit("requestAction", gameState);
			io.to(this.gameMasterSocketId).emit("requestAction", {
				target: target.teamName
			})
		}.bind(this))
	}

	removeParticipant(teamName) {
		this.nodes.filter(player => player.name === teamName)
		.forEach(function(player) {
			this.nodes.splice(player, 1);
		}.bind(this))
		io.to(this.gameMasterSocketId).emit("playersUpdated", this.nodes.map(node =>  node.name))
	}

	addParticipant(teamName, socketId) {
		this.removeParticipant(teamName)
		this.nodes.push({name:teamName, id: socketId});
		io.to(this.gameMasterSocketId).emit("playersUpdated", this.nodes.map(node => node.name))
	}
}

module.exports = {
	Socket
}