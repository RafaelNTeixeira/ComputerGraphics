import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.smallTriangle1 = new MyTriangleSmall(this);
    this.smallTriangle2 = new MyTriangleSmall(this);
    this.bigTriangle1 = new MyTriangleBig(this);
    this.bigTriangle2 = new MyTriangleBig(this);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.diamondVisible = true;
    this.triangleVisible = false;
    this.parallelogramVisible = false;
    this.smallTriangle1Visible = true;
    this.bigTriangle1Visible = true;
    this.smallTriangle2Visible = false;
    this.bigTriangle2Visible = true;

    this.setupY = 0.70;
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
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

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    // Draw Elements
    if (this.diamondVisible) {
      this.setDiffuse(0.0, 1, 0.0, 1.0);
  
      var rad = 45 * Math.PI / 180; 
      var rotDiamond = [
          Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
          Math.sin(rad), Math.cos(rad), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
      ];

      var transDiamond = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, this.setupY, 0.0, 1.0,
      ]

      this.pushMatrix();
      this.multMatrix(transDiamond);
      this.multMatrix(rotDiamond);
      this.diamond.display();
      this.popMatrix();
    }  
  
    if (this.triangleVisible) {
      this.setDiffuse(1.0, 0.5, 0.5, 1.0);

      var rad = - 135 * Math.PI / 180; 

      var rotTriangle = [
          Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
          Math.sin(rad), Math.cos(rad), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
      ];

      this.pushMatrix();
      //this.multMatrix(transDiamond);
      this.multMatrix(rotTriangle);
      this.triangle.display();
      this.popMatrix();
    }

    if (this.parallelogramVisible) {
      this.setDiffuse(1.0, 1.0, 0.0, 1.0);

      var rad = 90 * Math.PI / 180;

      var rotParallelogram = [
        Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
        Math.sin(rad), Math.cos(rad), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];

      var transParallelogram = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, -1.0, 0.0, 1.0,
      ]

      this.pushMatrix();
      this.multMatrix(rotParallelogram);
      this.multMatrix(transParallelogram);
      this.parallelogram.display();
      this.popMatrix();
    }

    if (this.smallTriangle1Visible) {
      this.setDiffuse(0.5, 0.0, 0.5, 1.0);

      var rad = 45 * Math.PI / 180; 

      var rotsmallTriangle1 = [
        Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
        Math.sin(rad), Math.cos(rad), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, -this.setupY, 0.0, 1.0
      ];

      var transmallTriangle1 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
      ]
      /* Não sei é bom fazer assim */
      this.pushMatrix();
      this.multMatrix(rotsmallTriangle1);
      //this.multMatrix(transmallTriangle1);
      this.smallTriangle1.display();
      this.popMatrix();
    }

    if (this.bigTriangle1Visible) {
      this.setDiffuse(0.2, 0.4, 0.8, 1.0);

      var rad = 90 * Math.PI / 180; 

      var rotBigTriangle1 = [
          Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
          Math.sin(rad), Math.cos(rad), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
      ];

      var transBigTriangle1 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        this.setupY, 2.0, 0.0, 1.0,
      ]

      this.pushMatrix();
      this.multMatrix(transBigTriangle1);
      this.multMatrix(rotBigTriangle1);
      this.bigTriangle1.display();
      this.popMatrix();
    }

    if (this.smallTriangle2Visible) {
      this.setDiffuse(1.0, 0.0, 0.0, 1.0);

      var rad = 135 * Math.PI / 180; 

      var rotBigTriangle1 = [
        Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
        Math.sin(rad), Math.cos(rad), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];

      this.pushMatrix();
      this.multMatrix(rotBigTriangle1);
      this.smallTriangle2.display();
      this.popMatrix();
    }

    if (this.bigTriangle2Visible) {
      this.setDiffuse(1.0, 0.5, 0.0, 1.0);

      var rad = - 90 * Math.PI / 180; 

      var rotBigTriangle2 = [
          Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
          Math.sin(rad), Math.cos(rad), 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
      ];

      var transBigTriangle2 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -this.setupY, 2.0, 0.0, 1.0,
      ]

      this.pushMatrix();
      this.multMatrix(transBigTriangle2);
      this.multMatrix(rotBigTriangle2);
      this.bigTriangle2.display();
      this.popMatrix();
    }

    // ---- END Primitive drawing section
  }
}
