import {Column, Entity, Index, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Mob}                                                   from "../../../lib/phaser/mob";

@Entity()
@Index('playerMap', ['map'])
@Index('playerLocation', ['map', 'x', 'y'])
@Unique('playerCharacter', ['characterId'])
export class Player extends Mob {

    _x: number = 0;
    _y: number = 0;
    @Column('int', {nullable: true})
    get y(): number {
        return Math.floor(this.sprite ? this.sprite.y : this._y);
    }

    set y(value: number) {
        this._y = value;
        if (this.sprite) {
            this.sprite.y = value;
        }
    }

    @Column('int', {nullable: true})
    get x(): number {
        return Math.floor(this.sprite ? this.sprite.x : this._x);
    }

    set x(value: number) {
        this._x = value;
        if (this.sprite) {
            this.sprite.x = value;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    characterId: number;
    @Column()
    map: string;
    @Column()
    name: string;

    asPayload() {
        return {
            id    : this.characterId,
            name  : this.name,
            x     : this.x,
            y     : this.y,
            moving: this.sprite.moving
        };
    }
}
