import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./garden/MyFlower.js";
import { MyGarden } from "./garden/MyGarden.js";
import { MyRock } from "./rock/MyRock.js";
import { MyRockSet } from "./rock/MyRockSet.js";
import { MyBeeHead } from "./bee/MyBeeHead.js";
import { MyBee } from "./bee/MyBee.js";
import { MyPolen } from "./garden/MyPolen.js";
import { MyHive } from "./hive/MyHive.js";
import { MyGrassPatch } from "./grass/MyGrassPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  initMaterials() {
    // Gerar cor aleatória
    const generateRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`; // Garantir que cor criada é compatível com hexToRgbA()
    };

    const randPetalColor = generateRandomColor();
    const randCenterColor = generateRandomColor();
    const randStemColor = generateRandomColor();
    const randLeavesColor = generateRandomColor();

    this.customMaterialValues = {
      'Color Petals': randPetalColor,
      'Color Center': randCenterColor,
      'Color Stem': randStemColor,
      'Color Leaves': randLeavesColor
    }

    this.petalsMaterial = new CGFappearance(this);
    this.centerMaterial = new CGFappearance(this);
    this.stemMaterial = new CGFappearance(this);
    this.leavesMaterial = new CGFappearance(this);
    this.grassMaterial = new CGFappearance(this);

    this.updateCustomMaterial();
  }

  updateCustomMaterial() {
    this.petalsMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Color Petals']));
    this.centerMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Color Center']));
    this.stemMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Color Stem']));
    this.leavesMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Color Leaves']));
  };
  
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();
    this.initMaterials();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.panoramaTexture = new CGFtexture(this, 'images/panorama4.jpg');

    this.petalTextures = [
      new CGFtexture(this, 'images/petals/petal1.jpg'),
      new CGFtexture(this, 'images/petals/petal2.jpg'),
      new CGFtexture(this, 'images/petals/petal3.jpg')
    ];
    this.receptacleTextures = [
      new CGFtexture(this, 'images/receptacles/receptacle1.jpg'),
      new CGFtexture(this, 'images/receptacles/receptacle2.jpg'),
      new CGFtexture(this, 'images/receptacles/receptacle3.jpg')
    ];
    this.stemTextures = [
      new CGFtexture(this, 'images/stems/stem1.jpg'),
      new CGFtexture(this, 'images/stems/stem2.jpg'),
      new CGFtexture(this, 'images/stems/stem3.jpg')
    ];
    this.leafTextures = [
      new CGFtexture(this, 'images/leaves/leaf1.jpg'),
      new CGFtexture(this, 'images/leaves/leaf2.jpg')
    ]
    this.randomPetalTexture = this.petalTextures[Math.floor(Math.random() * this.petalTextures.length)];
    this.randomReceptacleTexture = this.receptacleTextures[Math.floor(Math.random() * this.receptacleTextures.length)];
    this.randomStemTexture = this.stemTextures[Math.floor(Math.random() * this.stemTextures.length)];
    this.randomLeafTexture = this.leafTextures[Math.floor(Math.random() * this.leafTextures.length)];

    this.rockTexture = new CGFtexture(this, 'images/rock.jpg');
    this.topTex = new CGFtexture(this, 'images/hive/beehive_end.png');
    this.bottomTex = new CGFtexture(this, 'images/hive/hive_side.jpg');
    this.sideTex = new CGFtexture(this, 'images/hive/beehive_side.png');
    this.frontTex = new CGFtexture(this, 'images/hive/beehive_front.png');
    this.frontTexHoney = new CGFtexture(this, 'images/hive/beehive_front_honey.png');

    this.petalsMaterial.setTexture(this.randomPetalTexture);
    this.petalsMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.centerMaterial.setTexture(this.randomReceptacleTexture);
    this.centerMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.stemMaterial.setTexture(this.randomStemTexture);
    this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.leavesMaterial.setTexture(this.randomLeafTexture);
    this.leavesMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    /* ---------- Os valores --------------*/
    this.numPetals = Math.floor(Math.random() * 6) + 5;
    this.radiusPetals = Math.random() * 1 + 0.1;
    this.radiusCenter = Math.random() * 0.13 + 0.5;
    this.radiusStem = Math.random() * 0.1 + 0.05;
    this.scaleFactor = Math.random() * 0.95 + 0.05;
    const values = [4, 6, 8];
    this.heightStem = values[Math.floor(Math.random() * values.length)];
    this.gardenRows = 5;
    this.gardenCols = 5;
    /* ----------------------------------- */

    this.displayNormals = false;
    this.displayPanorama = false;
    this.displayFlower = false;
    this.displayGarden = false;
    this.displayRocks = true;
    this.displayBee = false;
    this.displayHive = true;
    this.followBee = false;
    this.firstPerson = false;
    this.thirdPerson = true;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 200, 50, 50, false);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.rock = new MyRock(this, 3, 10, 10, false);
    this.rockSet = new MyRockSet(this);
    this.beeHead = new MyBeeHead(this);
    this.polen = new MyPolen(this, 3, 50, 50);
    this.bee = new MyBee(this, 0, 0, 0);
    this.hive = new MyHive(this, this.topTex, this.sideTex, this.frontTex, this.sideTex, this.sideTex, this.bottomTex);
    this.hiveHoney = new MyHive(this, this.topTex, this.sideTex, this.frontTexHoney, this.sideTex, this.sideTex, this.bottomTex);
    this.grass = new MyGrassPatch(this, 50, 4, 50, 5, 50, 50);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.displayNormals = false;
    this.displayPanorama = true;
    this.infiniteView = false;
    this.beeSizeFactor = 1;
    this.speedFactor = 1;

    this.flower = new MyFlower(this, this.numPetals, this.radiusPetals, this.radiusCenter, this.radiusStem, this.heightStem, 
      this.customMaterialValues['Color Petals'], this.customMaterialValues['Color Center'], this.customMaterialValues['Color Stem'], this.customMaterialValues['Color Leaves']);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
  }

  initLights() {
    this.lights[0].setPosition(15, 10, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(15, 0, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.01,
      1000,
      vec3.fromValues(20, 20, 10),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  hexToRgbA(hex) {
      var ret;
      //either we receive a html/css color or a RGB vector
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          ret=[
              parseInt(hex.substring(1,3),16).toPrecision()/255.0,
              parseInt(hex.substring(3,5),16).toPrecision()/255.0,
              parseInt(hex.substring(5,7),16).toPrecision()/255.0,
              1.0
          ];
      }
      else
          ret=[
              hex[0].toPrecision()/255.0,
              hex[1].toPrecision()/255.0,
              hex[2].toPrecision()/255.0,
              1.0
          ];
      return ret;
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -9, 0);
    this.scale(500, 500, 500);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.earthTexture.bind();
    this.translate(0, 20, 0);
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.sphere.display();
    this.popMatrix();

    let time = Date.now();
 
    if (this.displayRocks){
      this.pushMatrix();
      this.translate(-20, -8, 40);
      this.rockSet.display();
      this.popMatrix();
    }  
    
    if (this.displayHive){
      this.pushMatrix();
      this.scale(5, 5, 5);
      this.translate(-4, -0.6, 10);
      this.hive.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      this.panorama.display();
    } 
    
    if (this.displayBee) {
      this.updateBee(time);

      if (this.followBee) {
        this.camera.setTarget(vec3.fromValues(this.bee.position.x, this.bee.position.y + 10, this.bee.position.z));
      }
      else if (this.firstPerson) {
        this.firstPersonView();
      }
      else if (this.thirdPerson) {
        this.thirdPersonView();
      }

      this.bee.display();
    }

    if (this.displayFlower) {
      this.flower.display();
    }

    if (this.displayGarden) {
      this.garden.display();
    }

    this.pushMatrix();
    this.grassMaterial.setDiffuse(0, 0.2, 0, 1);
    this.grassMaterial.apply();
    this.translate(10, -8, 0);
    this.scale(0.2, 0.2, 0.2);
    this.grass.display();
    this.popMatrix();
    
    // ---- END Primitive drawing section
    this.update();
  }

  updateBee(t){
    this.bee.updateBee(t, this.speedFactor, this.beeSizeFactor);
  }

  checkKeys() {
    var text = "Keys pressed:";
    var keysPressed = false;
  
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S";
      keysPressed = true;
    }

    if (keysPressed) console.log(text);
  }

  update() {
    this.checkKeys();
  }

  firstPersonView() {
    let directionX = Math.cos(this.bee.beeAngle);
    let directionZ = Math.sin(this.bee.beeAngle);

    let newDirectionX = directionZ;
    let newDirectionZ = directionX;

    let targetX = this.bee.position.x + newDirectionX;
    let targetY = this.bee.position.y;
    let targetZ = this.bee.position.z + newDirectionZ;

    this.camera.setPosition(vec3.fromValues(this.bee.position.x, this.bee.position.y, this.bee.position.z));
    this.camera.setTarget(vec3.fromValues(targetX, targetY, targetZ));
  }

  thirdPersonView() {
    let directionX = Math.cos(this.bee.beeAngle);
    let directionZ = Math.sin(this.bee.beeAngle);

    let newDirectionX = directionZ;
    let newDirectionZ = directionX;

    let distance = 30;
    let heightOffset = 10;

    let cameraX = this.bee.position.x - newDirectionX * distance;
    let cameraY = this.bee.position.y + heightOffset;
    let cameraZ = this.bee.position.z - newDirectionZ * distance;

    this.camera.setPosition(vec3.fromValues(cameraX, cameraY, cameraZ));
    this.camera.setTarget(vec3.fromValues(this.bee.position.x, this.bee.position.y, this.bee.position.z));
  }
  
}
