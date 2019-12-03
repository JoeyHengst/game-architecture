import {NestFactory}    from '@nestjs/core';
import {WorldModule}    from './world.module';
import {environment}    from "../../config/environment";
import {Logger}         from "@nestjs/common";
import {WorldConstants} from "../../config/world.constants";
import * as path from "path";

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const logger = new Logger(WorldConstants.NAME + ' Server');
async function bootstrap() {
    const app = await NestFactory.create(WorldModule);
    app.connectMicroservice({
        transport: environment.microservice.transport,
        options: {
            ...environment.microservice.options,
            name: WorldConstants.NAME + ' Server'
        }
    });
    app.enableCors({
        origin     : true,
        credentials: true
    });
    app.useLogger(logger);
    await app.enableShutdownHooks();
    await app.startAllMicroservices();
    await app.listen(environment.servers.world.port);
}

bootstrap();
