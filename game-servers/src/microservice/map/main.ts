import {NestFactory}    from '@nestjs/core';
import {MapModule}      from './map.module';
import {createDatabase} from "../../lib/database/database.module";
import {config}         from "../../lib/config";
import {Logger}         from "@nestjs/common";


const logger = new Logger('Map');

async function bootstrap() {
    await createDatabase('map');
    const app = await NestFactory.createMicroservice(MapModule, {
        transport: config.microservice.transport,
        options: {
            url: config.microservice.options.url,
            queue: 'map'
        }
    });
    app.useLogger(logger);
    await app.listen(() => {
        logger.log("Map Microservice is listening ...");
    });
}

bootstrap();
