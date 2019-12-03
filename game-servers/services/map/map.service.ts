import {Inject, Injectable, Type}                                           from '@nestjs/common';
import {MapConstants}                                                       from "./constants";
import {BaseScene}                                                          from "./maps/base.scene";
import {Repository}                                                         from "typeorm";
import {Player}                                                             from "./entities/player";
import {InjectRepository}                                                   from "@nestjs/typeorm";
import {MapEmitter}                                                         from "./map.emitter";
import {CharacterClient}                                                    from "../character/client/character.client";
import {PlayerDirectionalInput}                                             from "./actions";
import {concatMap, filter, map, mergeMap, takeUntil, throttleTime, toArray} from "rxjs/operators";
import {async}                                                              from "rxjs/internal/scheduler/async";
import {WorldConstants}                                                     from "../../lib/constants/world.constants";
import {fromPromise}                                                        from "rxjs/internal-compatibility";
import {from, interval}                                                     from "rxjs";
import {Game}                                                               from "phaser";
import {BackendScene}                                                       from "./maps/backend.scene";
import {MapTransition}                                                      from "./entities/map-transition";
import {CharacterLoggedOut}                                                 from "../character/actions";

@Injectable()
export class MapService {

    phaser: Game;

    constructor(
        private emitter: MapEmitter,
        private character: CharacterClient,
        @Inject(MapConstants.MAP) public map: BackendScene,
        @InjectRepository(MapTransition) private transitionRepo: Repository<MapTransition>,
        @InjectRepository(Player) private playerRepo: Repository<Player>
    ) {

        this.phaser = new Game({
            type   : Phaser.HEADLESS,
            width  : 1024,
            height : 768,
            banner : true,
            audio  : {
                noAudio: true
            },
            scene  : [this.map],
            physics: {
                default: 'arcade',
                arcade : {
                    gravity: {y: 0, x: 0}
                }
            }
        });

    }


    start() {
        this.phaser.scene.start(this.map.constant);
        this.map.savePlayer
            .pipe(takeUntil(this.map.stop$))
            .pipe(filter(player => !!player))
            .subscribe(async player => await this.playerRepo.save(player));
        this.map.emitter.pipe(takeUntil(this.map.stop$))
            .pipe(throttleTime(1000, async, {leading: true}))
            .pipe(concatMap(() => fromPromise(this.map.getAllPlayers())))
            .pipe(throttleTime(1000, async, {leading: true, trailing: true}))
            .subscribe((players) => {
                this.emitter.allPlayers(WorldConstants.CONSTANT, this.map.constant, players);
            });
    }

    stop() {
        this.map.stop$.next();
        this.phaser.scene.stop(this.map.constant);
    }

    async changedMaps(characterId: number, world: string, map: string, newX: number, newY: number) {
        let player = await this.playerRepo.findOne({characterId, world});
        if (player) {
            let lastMap = player.map + '';
            if (map === this.map.constant) {
                player.map     = map;
                player.x       = newX;
                player.y       = newY;
                let transition = await this.transitionRepo.findOne({map: lastMap, destinationMap: map});
                if (transition) {
                    player.x = transition.destinationX;
                    player.y = transition.destinationY;
                }
                await this.playerRepo.save(player);
                this.playerJoinedMap(player);
            }
            if (lastMap === this.map.constant) {
                this.playerLeftMap(player)
            }
        }
    }

    async loggedIn(characterId: number, name: string, world: string) {
        let player = await this.playerRepo.findOne({characterId});
        if (!player && this.map.constant === 'tutorial') {
            player = this.playerRepo.create({characterId, world, map: 'tutorial', x: 100, y: 100});
        }
        if (player) {
            player.name = name;
            await this.playerRepo.save(player);
            this.playerJoinedMap(player);
        }
    }

    private playerJoinedMap(player: Player) {
        this.map.addPlayer(player);
        this.emitter.playerJoinedMap(player.world, this.map.constant, player.characterId, player.name, player.x, player.y);
    }

    async loggedOut(characterId: number, world: string) {
        let player = await this.playerRepo.findOne({characterId});
        if (player && player.map === this.map.constant) {
            this.playerLeftMap(player);
        }

    }

    private playerLeftMap(player: Player) {
        this.map.removePlayer(player);
        this.emitter.playerLeftMap(player.world, this.map.constant, player.characterId, player.name);
    }

    movePlayer(data: PlayerDirectionalInput) {
        if (this.map.entities.player[data.characterId]) {
            this.map.movePlayer(data);
        }
    }

}
