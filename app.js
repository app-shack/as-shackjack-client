
let config = require('./config');
const {Socket} = require('./src/socket');

let url = config.socket.url + ":" + config.socket.port;

let socket = new Socket(url, config.team.name);

