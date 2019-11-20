import {NestFactory}    from '@nestjs/core';
import {AiModule}       from './ai.module';
import {createDatabase} from "../../lib/database/database.module";
import {config}         from "../../lib/config";
import {Logger}         from "@nestjs/common";


const logger = new Logger('AI');

async function bootstrap() {
    await createDatabase('ai');
    const app = await NestFactory.createMicroservice(AiModule, {
        transport: config.microservice.transport,
        options  : {
            url  : config.microservice.options.url,
            queue: 'area'
        }
    });
    app.useLogger(logger);
    await app.listen(() => {
        logger.log("AI Microservice is listening ...");
    });
}

bootstrap();