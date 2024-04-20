import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyStem } from "./MyStem.js";
import { MyFlower } from "./MyFlower.js";
import { MyGarden } from "./MyGarden.js";

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
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.panoramaTexture = new CGFtexture(this, 'images/panorama4.jpg');
    console.log(this.panoramaTexture);
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    /* ---------- Os valores --------------*/
    this.numPetals = Math.floor(Math.random() * 10) + 1;
    this.radiusPetals = Math.random() * 0.9 + 0.1;
    this.radiusCenter = Math.random() * 0.5 + 0.5;
    this.radiusStem = Math.random() * 0.25 + 0.25;
    this.heightStem = Math.random() * (8 - 2.5) + 2.5;
    this.gardenRows = 5;
    this.gardenCols = 5;
    /* ----------------------------------- */

    this.displayNormals = false;
    this.displayPanorama = false;
    this.displayFlower = false;
    this.displayGarden = true;
    this.centerView = false;


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    //this.sphere = new MySphere(this, 200, 50, 50);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.petal =  new MyPetal(this);
    this.receptacle = new MyReceptacle(this);
    this.stem = new MyStem(this);
    this.flower = new MyFlower(this, this.numPetals, this.radiusPetals, this.radiusCenter, this.radiusStem, this.heightStem, this.customMaterialValues['Color Petals'], this.customMaterialValues['Color Center'], this.customMaterialValues['Color Stem']);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
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
    this.translate(0,-100,0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    
    /*
    this.pushMatrix();
    this.earthTexture.bind();
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.sphere.display();
    this.popMatrix();
    */

    if (this.displayPanorama) {
      this.panorama.display();
    }

    if (this.displayFlower) {
      this.flower.display();
    }

    if (this.displayGarden) {
      this.garden.display();
    }
    
    // ---- END Primitive drawing section
  }
}
