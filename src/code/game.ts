import { Container } from '@pixi/display';
import { Application, Sprite, Texture } from 'pixi.js';
import { Wheel } from './wheel';
import { TRANSITION_DURATION } from './game-config';

export enum GameState {
  Idle = 'idle',
  Accelerated = 'accelerated',
  TransitionToIdle = 'transitionToIdle',
  TransitionToAccelerated = 'transitionToAccelerated',
}
const NEXT_STATE_OF = {
  [GameState.Idle]: GameState.TransitionToAccelerated,
  [GameState.TransitionToAccelerated]: GameState.Accelerated,
  [GameState.Accelerated]: GameState.TransitionToIdle,
  [GameState.TransitionToIdle]: GameState.Idle,
};


export class Game {

  private currentState: GameState = GameState.Idle;
  private activeBtn: Sprite;
  private inactiveBtn: Sprite;
  private wheel: Wheel;

  constructor(app: Application, actionBtnTextures: Texture[], wheelTextures: Texture[]) {
    const container = new Container();
    app.stage.addChild(container);

    const screenMiddleX = app.screen.width / 2;
    const screenMiddleY = app.screen.height / 2;

    // prepare wheel
    this.wheel = new Wheel(wheelTextures, container, app.ticker, screenMiddleX, screenMiddleY);
    this.wheel.currentAppState = this.currentState;

    // prepare action buttons
    const [activeBtnSprite, inactiveBtnSprite] = actionBtnTextures.map((btnTexture: Texture): Sprite => {
      const sprite = new Sprite(btnTexture);
      sprite.anchor.set(0.5);
      sprite.scale.set(0.7);
      sprite.position.x = screenMiddleX;
      sprite.position.y = screenMiddleY;
      container.addChild(sprite);
      return sprite;
    });

    inactiveBtnSprite.renderable = false;
    activeBtnSprite.cursor = 'pointer';
    activeBtnSprite.eventMode = 'static';
    activeBtnSprite.on('pointerup', () => this.manageGameState());

    this.activeBtn = activeBtnSprite;
    this.inactiveBtn = inactiveBtnSprite;
  }

  private manageGameState() {
    this.currentState = NEXT_STATE_OF[this.currentState];
    this.activeBtn.renderable = this.currentState === GameState.Idle || this.currentState === GameState.Accelerated;
    this.inactiveBtn.renderable = this.currentState === GameState.TransitionToAccelerated || this.currentState === GameState.TransitionToIdle;
    this.wheel.currentAppState = this.currentState;
    // console.log(this.currentState)
    if (this.currentState === GameState.TransitionToAccelerated || this.currentState === GameState.TransitionToIdle) {
      setTimeout(() => this.manageGameState(), TRANSITION_DURATION);
    }
  }

}
