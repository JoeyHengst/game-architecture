import {Module}                   from "@nestjs/common";
import {CharacterClient}          from "./character.client";
import {MicroserviceClientModule} from "../../../lib/microservice-client/microservice-client.module";

@Module({
    imports  : [
        MicroserviceClientModule
    ],
    providers: [
        CharacterClient
    ],
    exports  : [
        CharacterClient
    ]
})
export class CharacterClientModule {

}
