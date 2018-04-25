var config = {};

config.socket = {};
config.team = {};

config.socket.host = "hostname";
config.socket.url = "http://127.0.0.1";
config.socket.port = 3000;

config.team.name = "Team " + Math.floor(Math.random() * 100000);

module.exports = config;