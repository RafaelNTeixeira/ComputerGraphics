import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

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
    this.rockTexture = new CGFtexture(this, 'images/rock.jpg');

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 200, 50, 50, false);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.rock = new MyRock(this, 3, 10, 10, false);
    this.rockSet = new MyRockSet(this);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.displayNormals = false;
    this.displayPanorama = true;
    this.infiniteView = false;
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
      vec3.fromValues(40, 40, 10),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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
    this.translate(0,-250,0);
    this.scale(800, 800, 800);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    
    
    this.pushMatrix();
    this.earthTexture.bind();
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
    this.sphere.display();
    this.popMatrix();

    this.rockSet.display();
    
    /*
    this.pushMatrix();
    this.rockTexture.bind(); 
    this.scale(1, 0.8, 1.2); 
    this.rock.display();
    this.popMatrix();
    */


    if (this.displayPanorama) {
      this.panorama.display();
    }

    // ---- END Primitive drawing section
  }
}
