import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyStem } from './MyStem.js';

export class MyBeeArm extends CGFobject {
    constructor(scene){
        super(scene);
        this.leg = new MyStem(this.scene, 0.5, 5, Math.PI / 2);
        this.foot = new MySphere(this.scene, 0.5, 30, 30);
        this.lowerArm = new MyStem(this.scene, 0.5, 4, Math.PI / 2);
    }
    
    display(){
        /* Upper Arm */

        var rad = -90 * Math.PI / 180;
        var rotArm = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(5, -6.5, 0);
        this.scene.multMatrix(rotArm);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5, -6.5, 0);
        this.foot.display();
        this.scene.popMatrix();

        var rad = 90 * Math.PI / 180;
        var rotArm = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(10, -6.5, 0);
        this.foot.display();
        this.scene.popMatrix();

        /* Lower Arm */
        var rad = 90 * Math.PI / 180;
        var rotArm1 = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(10, -10.5, 0);
        this.scene.multMatrix(rotArm1);
        this.lowerArm.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, -10.5, 0);
        this.foot.display();
        this.scene.popMatrix();
    }
}