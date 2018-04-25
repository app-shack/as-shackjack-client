const {Socket} = require("./socket")
const {Game} = require("./game");
const {Player} = require("./player");

let socket = new Socket();
let game = null;


socket.eventEmitter.addListener("onGameBegin", function() {
	game = new Game(socket);
	let names = socket.nodes.map(node => node.name)
	names.forEach(function(name) {
		var player = new Player(name);
		game.registerPlayer(player);
	})
	game.begin();
})
