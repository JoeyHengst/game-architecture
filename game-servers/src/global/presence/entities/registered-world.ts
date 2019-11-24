import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {GameWorld}                                      from "../../../../lib/entities/game-world";

@Unique('instance', ['constant', 'host', 'port', 'instanceId'])
@Entity()
export class RegisteredWorld {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: null})
    instanceId: number;
    @Column({default: 1})
    index: number;
    @Column()
    host: string;
    @Column('int')
    port: number;
    @Column({nullable: false})
    constant: string;
    @Column({nullable: false})
    name: string;
    @Column('int')
    capacity: number;
    @Column({nullable: false})
    status: 'online' | 'offline' = 'online';
    @Column({default: false})
    full: boolean;

    constructor(host: string, port: number, instanceId: number, constant: string, name: string, capacity: number) {
        this.host       = host;
        this.port       = port;
        this.instanceId = instanceId;
        this.constant   = constant;
        this.name       = name;
        this.capacity   = capacity;
    }
}
