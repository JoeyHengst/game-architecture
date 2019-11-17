import {Injectable} from '@angular/core';
import * as io      from "socket.io-client";
import Socket = SocketIOClient.Socket;
import {Server}     from "./server";

@Injectable({
    providedIn: 'root'
})
export class ServerConnectionManager {

    connections: {[name:string]: Socket} = {};
    constructor() {
    }

    connect(server:Server) {
        if (!this.connections.hasOwnProperty(server.name)) {
            this.connections[server.name] = io.connect('http://' + server.ip + ':' + server.port);
        }
    }

    isConnected(name:string) {
        return this.connections.hasOwnProperty(name) && this.connections[name].connected;
    }
}