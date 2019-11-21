import {Module}                from '@nestjs/common';
import {WorldController}       from './world.controller';
import {WorldService}          from './world.service';
import {WorldGateway}          from "./world.gateway";
import {DATABASE_MODULE}       from "../../lib/database.module";
import {TypeOrmModule}         from "@nestjs/typeorm";
import {AccountClientModule}   from "../../microservice/account/client/account-client.module";
import {CharacterClientModule} from "../../microservice/character/client/character-client.module";

@Module({
    imports    : [
        AccountClientModule,
        CharacterClientModule,
        TypeOrmModule.forRoot({
            ...DATABASE_MODULE,
            type    : 'mysql',
            database: 'world',
            entities: [__dirname + '/entities/*{.js,.ts}']
        })
    ],
    controllers: [WorldController],
    providers  : [WorldService, WorldGateway],
})
export class WorldModule {
}
