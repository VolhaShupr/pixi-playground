import { Application, Assets, Sprite, Texture } from 'pixi.js';
import { Game } from './game';
import { GAME_TEXTURES } from './game-config';


export async function createGame() {
  const element = document.querySelector<HTMLDivElement>('#app');
  const app = new Application<HTMLCanvasElement>({
    resizeTo: window,
    backgroundColor: '#4a9dc9',
    autoStart: false
  });
  element?.appendChild(app.view);

  Assets.addBundle('load-screen', GAME_TEXTURES);
  const textures = await Assets.loadBundle('load-screen');

  const viewWidth = app.screen.width / app.renderer.resolution;
  const backgroundSprite = new Sprite(textures.background);
  backgroundSprite.width = viewWidth;
  backgroundSprite.height = app.screen.height;
  app.stage.addChild(backgroundSprite);

  const wheelTextures: Texture[] = Object.entries(textures)
    .filter(([textureKey]) => textureKey.includes('sym'))
    .map(([_, texture]: [string, Texture]) => texture);

  new Game(app,[textures.btnActive, textures.btnInactive], wheelTextures);
  app.start();
}
