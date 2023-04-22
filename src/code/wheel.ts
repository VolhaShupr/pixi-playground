import { Container, PI_2, Sprite, Texture, Ticker } from 'pixi.js';
import { GameState } from './game';
import { TRANSITION_PER_FRAME, WHEEL_CONFIG } from './game-config';

export class WheelSlot extends Sprite {

  constructor(texture: Texture, container: Container, public currentAngle: number = 0, scale: number = 0.75) {
    super(texture);
    this.anchor.set(0.5);
    this.scale.set(scale);
    container.addChild(this);
  }

}


export class Wheel {

  private sprites: WheelSlot[] = [];
  private spinSpeed: number = 0;
  private speedTransition: 0 | -1 | 1 = 0;

  set currentAppState(gameState: GameState) {
    switch (gameState) {
      case GameState.Idle: {
        this.spinSpeed = WHEEL_CONFIG.spinSpeed.idle;
        this.speedTransition = 0;
        break;
      }
      case GameState.Accelerated: {
        this.spinSpeed = WHEEL_CONFIG.spinSpeed.accelerated;
        this.speedTransition = 0;
        break;
      }
      case GameState.TransitionToAccelerated: {
        this.speedTransition = 1;
        break;
      }
      case GameState.TransitionToIdle: {
        this.speedTransition = -1;
        break;
      }
    }
  }

  constructor(
    textures: Texture[], container: Container, ticker: Ticker,
    private centerX: number = 0, private centerY: number = 0,
  ) {
    const anglePerSprite = PI_2 / textures.length;

    this.sprites = textures.map((texture: Texture, i: number) => {
      const sprite = new WheelSlot(texture, container, anglePerSprite * i);
      this.moveSprite(sprite);
      return sprite;
    });

    ticker.add(this.onFrame);
  }

  private onFrame = (delta: number) => {
    this.spin(delta);
  }

  private spin(delta: number) {
    if (this.speedTransition) {
      this.spinSpeed += TRANSITION_PER_FRAME * this.speedTransition;
    }
    const angle = this.spinSpeed * delta;

    for (let sprite of this.sprites) {
      if (sprite.currentAngle > PI_2) {
        sprite.currentAngle = sprite.currentAngle - PI_2;
      }
      sprite.currentAngle += angle;
      this.moveSprite(sprite);
    }
  }

  private moveSprite(sprite: WheelSlot): void {
    sprite.position.set(
      WHEEL_CONFIG.radius * Math.cos(sprite.currentAngle) + this.centerX,
      WHEEL_CONFIG.radius * Math.sin(sprite.currentAngle) + this.centerY,
    );
  }

}
