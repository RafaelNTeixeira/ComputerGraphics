import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.smallTriangle1 = new MyTriangleSmall(this.scene, [
			0, 0,
			0.25, 0.25,
			0, 0.5
			,
			0, 0,
			0.25, 0.25,
			0, 0.5
		]);
        this.smallTriangle2 = new MyTriangleSmall(this.scene, [
			0.25, 0.75,
			0.5, 0.5,
			0.75, 0.75
			,
			0.25, 0.75,
			0.5, 0.5,
			0.75, 0.75 
		]);
        this.bigTriangle1 = new MyTriangleBig(this.scene, [
			1.0, 0,
			0.5, 0.5,
			0, 0,
			1.0, 0,
			0.5, 0.5,
			0, 0
			,
			1.0, 0,
			0.5, 0.5,
			0, 0,
			1.0, 0,
			0.5, 0.5,
			0, 0
		]);
        this.bigTriangle2 = new MyTriangleBig(this.scene, [
			1.0, 1.0,
			0.5, 0.5,
			1.0, 0,
			1.0, 1.0,
			0.5, 0.5,
			1.0, 0
			,
			1.0, 1.0,
			0.5, 0.5,
			1.0, 0,
			1.0, 1.0,
			0.5, 0.5,
			1.0, 0
		]);
        this.initMaterials();
    }

    initMaterials(){
        // Green color
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.1,0.1,0.1,1.0);
        this.green.setDiffuse(0,1,0,1.0);
        this.green.setSpecular(1,1,1,1.0);
        this.green.setShininess(10.0);

        // Blue color
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.1,0.1,0.1,1.0);
        this.blue.setDiffuse(0,0.749*0.7,1*0.7,1.0);
        this.blue.setSpecular(1,1,1,1.0);
        this.blue.setShininess(10.0);

        // Pink color
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(0.1,0.1,0.1,1.0);
        this.pink.setDiffuse(1*0.7,0.714*0.7,0.757*0.7,1.0);
        this.pink.setSpecular(1,1,1,0);
        this.pink.setShininess(10.0);

        // orange color
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(0.1,0.1,0.1,1.0);
        this.orange.setDiffuse(1*0.7,0.647*0.7,0,1.0);
        this.orange.setSpecular(1,1,1,0);
        this.orange.setShininess(10.0);

        // yellow color
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(0.1,0.1,0.1,1.0);
        this.yellow.setDiffuse(1*0.7,1*0.7,0,1.0);
        this.yellow.setSpecular(1,1,1,0);
        this.yellow.setShininess(10.0);

        // red color
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.1,0.1,0.1,1.0);
        this.red.setDiffuse(1*0.7,0,0,1.0);
        this.red.setSpecular(1,1,1,0);
        this.red.setShininess(10.0);

        // purple color
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.1,0.1,0.1,1.0);
        this.purple.setDiffuse(0.58*0.7,0,0.827*0.7,1.0);
        this.purple.setSpecular(1,1,1,1.0);
        this.purple.setShininess(10.0);

        // texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
    }

    display() {
        this.setupY = 0.70;

        // Green Diamond 
        //this.scene.setDiffuse(0.0, 1, 0.0, 1.0);
  
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

        this.scene.pushMatrix();
        this.scene.multMatrix(transDiamond);
        this.scene.multMatrix(rotDiamond);
        this.texture.apply();
        this.diamond.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Purple Small Triangle
        //this.scene.setDiffuse(0.5, 0.0, 0.5, 1.0);

        var rad = 45 * Math.PI / 180; 

        var rotsmallTriangle1 = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -this.setupY, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(rotsmallTriangle1);
        //this.purple.apply();
        this.texture.apply();
        this.smallTriangle1.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Yellow Parallelogram
        //this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);
        var rad = 45 * Math.PI / 180;

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
            this.setupY, -4*this.setupY, 0.0, 1.0
        ]

        var scaleParallelogram = [
            -1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.multMatrix(transParallelogram);
        this.scene.multMatrix(rotParallelogram);
        this.scene.multMatrix(scaleParallelogram);
        this.texture.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        


        // -----------------------------------------------

        // Pink Triangle
        //this.scene.setDiffuse(1.0, 0.5, 0.5, 1.0);

        var rad = - 135 * Math.PI / 180; 

        var rotTriangle = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var transTriangle = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -this.setupY, -4*this.setupY, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.multMatrix(transTriangle);
        this.scene.multMatrix(rotTriangle);
        this.texture.apply();
        //this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Blue Big Triangle
        //this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);

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

        this.scene.pushMatrix();
        this.scene.multMatrix(transBigTriangle1);
        this.scene.multMatrix(rotBigTriangle1);
        //this.blue.apply();
        this.texture.apply();
        this.bigTriangle1.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Orange Big Triangle
        //this.scene.setDiffuse(1.0, 0.5, 0.0, 1.0);

        var rad = -90 * Math.PI / 180; 

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

        this.scene.pushMatrix();
        this.scene.multMatrix(transBigTriangle2);
        this.scene.multMatrix(rotBigTriangle2);
        //this.orange.apply();
        this.texture.apply();
        this.bigTriangle2.display();
        this.scene.popMatrix();

        // Red Small Triangle
        //this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);

        var rad = 135 * Math.PI / 180; 

        var rotSmallTriangle2 = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var transSmallTriangle2 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -5*this.setupY, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(transSmallTriangle2);
        this.scene.multMatrix(rotSmallTriangle2);
        // this.red.apply();
        this.texture.apply();
        this.smallTriangle2.display();
        this.scene.popMatrix();
        // -----------------------------------------------
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.bigTriangle1.enableNormalViz();
        this.bigTriangle2.enableNormalViz();
        this.smallTriangle1.enableNormalViz();
        this.smallTriangle2.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.bigTriangle1.disableNormalViz();
        this.bigTriangle2.disableNormalViz();
        this.smallTriangle1.disableNormalViz();
        this.smallTriangle2.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }
}