import {NestFactory}    from '@nestjs/core';
import {WorldModule}    from './world.module';
import {createDatabase} from "../../lib/database/database.module";
import {config}         from "../../lib/config";

async function bootstrap() {
    await createDatabase('world');
    const app = await NestFactory.create(WorldModule);
    app.enableCors({
        origin     : true,
        credentials: true
    });

    await app.listen(config.servers.world.port);
}

bootstrap();
