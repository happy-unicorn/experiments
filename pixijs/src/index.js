import 'normalize.css';
import { Application, Sprite } from 'pixi.js';

const app = new Application({
  width: 480,
  height: 640,
  antialias: true
});

app.loader.add('cat', 'sprites/cat.png').load((loader, resources) => {
  const cat = new Sprite(resources.cat.texture);

  cat.x = app.renderer.width / 2;
  cat.y = app.renderer.height / 2;
  cat.scale.x = 0.25;
  cat.scale.y = 0.25;
  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;

  app.stage.addChild(cat);

  app.ticker.add(() => {
    cat.rotation += 0.01;
  });
});

document.body.appendChild(app.view);