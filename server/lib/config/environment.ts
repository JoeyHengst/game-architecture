import {Transport}   from "@nestjs/common/enums/transport.enum";
import {PORTS}       from "../constants/ports.constants";
import {NatsOptions} from "@nestjs/microservices";
import '../scripts/load-env';

export const environment = {
    microservice: <NatsOptions>{
        transport: Transport.NATS,
        options  : {
            url : 'nats://' + (process.env.NATS_HOST || 'localhost') + ':' + (process.env.NATS_PORT || '4222'),
            user: process.env.NATS_USER || '',
            pass: process.env.NATS_PASSWORD || ''
        }
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    jwt         : {
        secret: process.env.JWT_SECRET || 'a-random-secret'
    },
    mysql       : {
        host    : process.env.MYSQL_HOST,
        port    : parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    },
    servers     : {
        world   : {
            host: process.env.WORLD_HOST || 'localhost',
            port: 3005 || (parseInt(process.env.WORLD_PORT || ('' + PORTS.WORLD)))
        },
        presence: {
            host: process.env.PRESENCE_HOST || 'localhost',
            port: process.env.PRESENCE_PORT || PORTS.PRESENCE
        }
    }
};
