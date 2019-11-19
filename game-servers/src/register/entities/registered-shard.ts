import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {GameShard}                                      from "../../../lib/entities/game-shard";

@Unique('socketId', ['socketId'])
@Unique('name', ['name'])
@Entity()
export class RegisteredShard implements GameShard {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    socketId: string;
    @Column()
    host: string;
    @Column()
    port: string;
    @Column({nullable: false})
    name: string;
    @Column('int')
    capacity: number;
    @Column('int')
    current: number;
    @Column({nullable: false})
    status: 'online' | 'offline' = 'online';

    constructor(host: string, port: string, socketId: string, name: string, capacity: number, current: number) {
        this.host     = host;
        this.port     = port;
        this.socketId = socketId;
        this.name     = name;
        this.capacity = capacity;
        this.current  = current;

    }
}
