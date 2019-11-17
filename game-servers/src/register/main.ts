import {NestFactory}    from '@nestjs/core';
import {RegisterModule} from './register.module';
import {PORTS}          from "../constants";
import {createDatabase} from "../lib/database/database.module";

async function bootstrap() {
    await createDatabase('register');
    const app = await NestFactory.create(RegisterModule);
    app.enableShutdownHooks();
    await app.listen(PORTS.REGISTER);
}

bootstrap();
