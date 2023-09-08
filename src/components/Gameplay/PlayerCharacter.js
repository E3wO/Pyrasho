import Phaser from "phaser";

export default class PlayerCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    // Add this sprite to the scene's physics system
    scene.physics.world.enable(this);

    // Enable access to this.body
    this.body.setCollideWorldBounds(true);

    // Add the sprite to the scene
    scene.add.existing(this);

    // Can now safely use "this" hereafter
    this.cursors = scene.input.keyboard.createCursorKeys();

    this.keys = {
        left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    };

    this.speed = 200;
    
  }

  update() {
    this.setVelocity(0); // Reset velocity each frame

    // Horizontal movement
    if (this.keys.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (this.keys.right.isDown) {
      this.setVelocityX(this.speed);
    }

    // Vertical movement
    if (this.keys.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.keys.down.isDown) {
      this.setVelocityY(this.speed);
    }
  }
}
