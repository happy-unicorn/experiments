import 'normalize.css';
import { Application, Sprite } from 'pixi.js';

const app = new Application({
  width: 480,
  height: 640,
  antialias: true
});

app.loader.add('cat', 'sprites/cat.png').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const cat = new Sprite(resources.cat.texture);

    // Setup the position of the bunny
    cat.x = app.renderer.width / 2;
    cat.y = app.renderer.height / 2;

    // Rotate around the center
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(cat);
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        cat.rotation += 0.01;
        // cat.visible = !cat.visible;
    });
});

document.body.appendChild(app.view);