import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";

export class MyCylinder extends CGFobject {
    constructor(scene, radius, height, colorLeaves){
        super(scene);
        this.height = height;
        this.stem = new MyStem(this.scene, radius, 2, Math.PI / 2);
        this.stem1 = new MyStem(this.scene, radius, 2, Math.PI);
        this.leafStem = new MyStem(this.scene, 0.2, 0.7, Math.PI / 2);
        this.petalLeaf = new MyPetal(this.scene, 0);
        this.colorLeaves = colorLeaves;
    }

    display() {
        const times = parseInt(this.height / 2);
        this.stem.display();
        var bot = 2;
        for (let i = 1; i < times; i++) {
            this.leaf(-2, this.radius - 0.1);
            var transCy = [
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, bot, 1.0,
            ]
            
            var scaleCy = [
                -1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0,
            ]
            
            bot += 2;
            
            this.scene.pushMatrix();
            this.scene.multMatrix(transCy);
            if (i % 2 == 0){
                var transCy1 = [
                    1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -Math.cos(Math.PI), 0.0, 0.0, 1.0,
                ]
                this.scene.multMatrix(scaleCy);
                this.scene.multMatrix(transCy1);
                this.leaf(-1 - Math.cos(Math.PI), this.radius - 0.1, -1);
            }
            this.scene.stemMaterial.apply();
            this.stem1.display();
            this.scene.popMatrix();
        }
        
    }

    leaf(posx, posy, invert = 1) {
        var scalePetal = [
            0.3, 0.0, 0.0, 0.0,
            0.0, 0.3 * invert, 0.0, 0.0,
            0.0, 0.0, 0.3, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        var transPetal = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            posy + 0.7, 0.0, -posx - 0.2, 1.0
        ]

        var transPetal1 = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            posy + 0.7, 0.0, -posx + 0.2, 1.0
        ]

        var rad = 90 * Math.PI / 180;
        var rotPetal = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        if (invert == -1){
            this.scene.multMatrix(transPetal1);
        } else {
            this.scene.multMatrix(transPetal);
        }
        this.scene.multMatrix(rotPetal);
        this.scene.multMatrix(scalePetal);
        this.scene.leavesMaterial.setDiffuse(...this.scene.hexToRgbA(this.colorLeaves));
        this.scene.leavesMaterial.apply();
        this.petalLeaf.display();
        this.scene.popMatrix();

        var rad = -90 * Math.PI / 180;
        var rotLeafStem = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        var transLeafStem = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            posy, 0.0, -posx, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.multMatrix(transLeafStem);
        this.scene.multMatrix(rotLeafStem);
        this.leafStem.display();
        this.scene.popMatrix();
    }

    setRadiusAndHeight(radius, height) {
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    setLeavesColor(colorLeaves) {
        this.colorLeaves = colorLeaves;
    }
}