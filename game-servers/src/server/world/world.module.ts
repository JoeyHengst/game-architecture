import {Module}                from '@nestjs/common';
import {WorldController}       from './world.controller';
import {WorldService}          from './world.service';
import {WorldGateway}          from "./world.gateway";
import {AccountClientModule}   from "../../microservice/account/client/account-client.module";
import {CharacterClientModule} from "../../microservice/character/client/character-client.module";

@Module({
    imports    : [
        AccountClientModule,
        CharacterClientModule
    ],
    controllers: [WorldController],
    providers  : [WorldService, WorldGateway],
})
export class WorldModule {
}
