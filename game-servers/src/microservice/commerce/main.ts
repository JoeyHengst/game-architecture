import {NestFactory}    from '@nestjs/core';
import {CommerceModule} from './commerce.module';
import {createDatabase} from "../../lib/database/database.module";
import {config}         from "../../lib/config";
import {Logger}         from "@nestjs/common";


const logger = new Logger('Commerce');

async function bootstrap() {
    await createDatabase('commerce');
    const app = await NestFactory.createMicroservice(CommerceModule, config.microservice);
    app.useLogger(logger);
    await app.listen(() => {
        logger.log("Commerce Microservice is listening ...");
    });
}

bootstrap();
