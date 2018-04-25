
let config = require('./config');
const {Socket} = require('./src/socket');
const {Bot} = require('./src/bot');

let url = config.socket.url + ":" + config.socket.port;

let socket = new Socket(url, new Bot());

