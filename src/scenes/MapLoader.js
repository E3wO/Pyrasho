class MapLoader {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("ground", "../assets/ground.png");
    console.log("Preloading ground in MapLoader.js");
  }
}

export default MapLoader;
