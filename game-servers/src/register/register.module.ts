import {Module}             from '@nestjs/common';
import {RegisterController} from './register.controller';
import {RegisterService}    from './register.service';
import {RegisterGateway}    from "./register.gateway";
import {DATABASE_MODULE}    from "../lib/database/database.module";
import {RegisteredServer}   from "./entities/registered-server";
import {TypeOrmModule}      from "@nestjs/typeorm";

@Module({
    imports    : [
        TypeOrmModule.forFeature([RegisteredServer]),
        TypeOrmModule.forRoot({
            ...DATABASE_MODULE,
            type    : 'mysql',
            database: 'register',
            entities: [__dirname + '/entities/*{.js,.ts}']
        })
    ],
    providers  : [RegisterGateway, RegisterService],
    controllers: [RegisterController],
    exports    : [RegisterGateway]
})
export class RegisterModule {
}
