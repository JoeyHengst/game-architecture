import {EventEmitter, Injectable, Injector} from '@angular/core';
import {ConnectionManager}                  from "../../../connection/src/lib/connection-manager";
import {Game}                               from "phaser";
import {GAME_CONFIG}                        from "./phaser/config";
import {SceneFactory}                       from "./phaser/scenes/scene-factory.service";
import {from, fromEvent}                    from "rxjs";
import {mergeMap, takeUntil}                from "rxjs/operators";
import Scene = Phaser.Scene;
import {TitleScene}                         from "./phaser/scenes/title/title.scene";
import {TutorialScene}                      from "./phaser/scenes/tutorial/tutorial.scene";

@Injectable()
export class GameEngineService {

    game: Game;

    private currentSceneKey = 'title';
    private currentScene: Scene;
    private destroyed       = new EventEmitter();

    scenes: { title: TitleScene, tutorial: TutorialScene } = {
        title   : null,
        tutorial: null
    };

    constructor(
        public sceneFactory: SceneFactory,
        public connection: ConnectionManager
    ) {
    }

    init(canvas: HTMLCanvasElement) {
        this.game            = new Game({...GAME_CONFIG, canvas});
        this.scenes.title    = this.sceneFactory.title();
        this.scenes.tutorial = this.sceneFactory.tutorial();
        this.game.scene.add('title', this.scenes.title);
        this.game.scene.add('tutorial', this.scenes.tutorial);
        this.game.scene.start('title');
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.game.events.emit('resize', window.innerWidth, window.innerHeight));
        this.game.events.on('game.scene', (scene) => {
            if (this.currentSceneKey !== '') {
                this.game.scene.stop(this.currentSceneKey);
            }
            this.currentSceneKey = scene;
            this.game.scene.start(scene);
            this.currentScene = this.scenes[scene];
        });
        this.connection.world$
            .pipe(takeUntil(this.destroyed))
            .subscribe(world => {
                if (world.socket) {
                }
            });
    }


    destroy() {
        this.game.events.emit('destroy');
        this.game.destroy(true);
        this.destroyed.emit();
    }
}
