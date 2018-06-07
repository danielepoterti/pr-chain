const Websocket = require('ws');

const P2P_PORT = 5001 || process.env.P2P_PORT;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; // se esiste li divide per virgola; se non esiste l'array è vuoto

// HTTP_PORT = 3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev


class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this. sockets = [];
    }

    listen() {
        const server = new Websocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));
        console.log(`Listening for p2p connections on: ${P2P_PORT}`);
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');
    }
}