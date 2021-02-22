import 'normalize.css';
import { Application, Container, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { randomInt } from './utils/randomInt';

const app = new Application({
  width: 512,
  height: 512,
  antialias: true
});

let state, explorer, treasure, blobs, dungeon, door, healthBar, message, gameScene, gameOverScene;

app.loader.add('sprites/treasureHunter.json').load((loader, resources) => {
  const { textures } = resources['sprites/treasureHunter.json'].spritesheet;

  gameScene = new Container();
  app.stage.addChild(gameScene);

  dungeon = new Sprite(textures['dungeon.png']);
  gameScene.addChild(dungeon);

  door = new Sprite(textures['door.png']);
  door.position.set(32, 0);
  gameScene.addChild(door);

  explorer = new Sprite(textures['explorer.png']);
  explorer.x = 68;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);

  treasure = new Sprite(textures['treasure.png']);
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  let numberOfBlobs = 6, spacing = 48, xOffset = 150, speed = 2, direction = 1;
  blobs = [];
  for (let i = 0; i < numberOfBlobs; i++) {
    let blob = new Sprite(textures["blob.png"]);
    blob.x = spacing * i + xOffset;
    blob.y = randomInt(0, app.stage.height - blob.height);
    blob.vy = speed * direction;
    direction *= -1;
    blobs.push(blob);
    gameScene.addChild(blob);
  }

  healthBar = new Container();
  healthBar.position.set(app.stage.width - 170, 4);
  gameScene.addChild(healthBar);

  let innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  let outerBar = new Graphics();
  outerBar.beginFill(0xFF3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;

  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  message = new Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  let left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40);

  left.press = function() {
    explorer.vx = -5;
    explorer.vy = 0;
  };
  left.release = function() {
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  up.press = function() {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  right.press = function() {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  down.press = function() {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  state = play;
  app.ticker.add(delta => {
    state(delta);
  });
});

function play(delta) {
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;

  contain(explorer, {x: 28, y: 10, width: 488, height: 480});

  let explorerHit = false;

  blobs.forEach(function(blob) {
    blob.y += blob.vy;
    let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }
    if(hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });

  if(explorerHit) {
    explorer.alpha = 0.5;
    healthBar.outer.width -= 1;
  } else {
    explorer.alpha = 1;
  }

  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }

  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "You lost!";
  }

  if (hitTestRectangle(treasure, door)) {
    state = end;
    message.text = "You won!";
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

function contain(sprite, container) {
  let collision = undefined;

  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  return collision;
}

function hitTestRectangle(r1, r2) {
  let combinedHalfWidths, combinedHalfHeights, vx, vy;

  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
}


function keyboard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);

  return key;
}


document.body.appendChild(app.view);