import { CGFobject } from '../lib/CGF.js';
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
        this.smallTriangle1 = new MyTriangleSmall(this.scene);
        this.smallTriangle2 = new MyTriangleSmall(this.scene);
        this.bigTriangle1 = new MyTriangleBig(this.scene);
        this.bigTriangle2 = new MyTriangleBig(this.scene);
    }

    display() {
        this.setupY = 0.70;

        // Green Diamond 
        this.scene.setDiffuse(0.0, 1, 0.0, 1.0);
  
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
        this.diamond.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Purple Small Triangle
        this.scene.setDiffuse(0.5, 0.0, 0.5, 1.0);

        var rad = 45 * Math.PI / 180; 

        var rotsmallTriangle1 = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -this.setupY, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(rotsmallTriangle1);
        this.smallTriangle1.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Yellow Parallelogram
        this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);

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
        this.parallelogram.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Pink Triangle
        this.scene.setDiffuse(1.0, 0.5, 0.5, 1.0);

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
        this.triangle.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Blue Big Triangle
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);

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
        this.bigTriangle1.display();
        this.scene.popMatrix();
        // -----------------------------------------------


        // Orange Big Triangle
        this.scene.setDiffuse(1.0, 0.5, 0.0, 1.0);

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
        this.bigTriangle2.display();
        this.scene.popMatrix();

        // Red Small Triangle
        this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);

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