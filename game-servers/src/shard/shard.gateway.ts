import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
}                       from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import * as io          from "socket.io-client";

@WebSocketGateway()
export class ShardGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    socket: Socket;
    capacity = 100;
    current  = 0;

    afterInit(server: Server): any {
        this.socket = io('http://localhost:3002');
        this.socket.on('connect', () => {
            // connected to register server!
        })
    }

    handleConnection(client: Socket, ...args: any[]): any {
        this.current++;
        this.update();
    }

    handleDisconnect(client: Socket): any {
        this.current--;
        if (this.current < 0) {
            this.current = 0;
        }
        this.update();
    }

    update() {
        this.socket.emit('update', {current: this.current, capacity: this.capacity});
    }
}
