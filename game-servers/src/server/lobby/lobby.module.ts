import {Module}              from '@nestjs/common';
import {LobbyController}     from './lobby.controller';
import {LobbyService}        from './lobby.service';
import {DATABASE_MODULE}     from "../../lib/database.module";
import {TypeOrmModule}       from "@nestjs/typeorm";
import {LobbyGateway}        from "./lobby.gateway";
import {AccountClientModule} from "../../microservice/account/client/account-client.module";

@Module({
    imports    : [
        TypeOrmModule.forRoot({
            ...DATABASE_MODULE,
            type    : 'mysql',
            database: 'lobby',
            entities: [__dirname + '/**/*.entity{.js,.ts}']
        }),
        AccountClientModule
    ],
    controllers: [LobbyController],
    providers  : [
        LobbyService,
        LobbyGateway
    ]
})
export class LobbyModule {
}
