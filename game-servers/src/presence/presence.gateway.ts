import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
}                               from "@nestjs/websockets";
import {Server, Socket}         from "socket.io";
import {PresenceService}        from "./presence.service";
import {OnApplicationBootstrap} from "@nestjs/common";
import {Events}                 from "../../lib/constants/events";
import {config}                 from "../lib/config";

@WebSocketGateway()
export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect, OnApplicationBootstrap {
    @WebSocketServer()
    server: Server;

    constructor(private service: PresenceService) {
    }

    async handleConnection(client: Socket, ...args: any[]) {
        if (Boolean(client.handshake.query.name)) {
            let name = client.handshake.query.name;
            let port = client.handshake.query.port || config.servers.shard.port;
            await this.service.online(client.id, this.service.getHost(client.handshake.address), port, name);
            client.broadcast.emit(Events.SERVER_LIST, await this.service.getServers());
            return;
        }

        client.emit(Events.SERVER_LIST, await this.service.getServers());
    }

    @SubscribeMessage(Events.USER_CONNECTED)
    async onUserConnection(client: Socket, data: { accountId: number, shard: string }) {
        await this.service.addUser(data);
        this.server.emit(Events.SERVER_LIST, await this.service.getServers());
    }

    @SubscribeMessage(Events.USER_DISCONNECTED)
    async onUserDisconnection(client: Socket, data: { accountId: number, shard: string }) {
        await this.service.removeUser(data);
        this.server.emit(Events.SERVER_LIST, await this.service.getServers());
    }

    async handleDisconnect(client: Socket) {
        if (client.handshake.query.track !== 'false') {
            await this.service.offline(client.id);
            this.server.emit(Events.SERVER_LIST, await this.service.getServers());
        }
    }

    async onApplicationBootstrap() {
    }


}
