import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyBeeHead } from "./MyBeeHead.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyWing } from "./MyWing.js";
import { MyStem } from './MyStem.js';

export class MyBee extends CGFobject {
    constructor(scene){
        super(scene);
        this.head = new MyBeeHead(this.scene);
        this.boby = new MySphere(this.scene, 7, 50, 50);
        this.bobyTexture = new CGFtexture(this.scene, 'images/bee/bee_stripe.png');
        this.cone = new MyCone(this.scene, 20, 4, 1);
        this.wing1 = new MyWing(this.scene, 30, 5);
        this.wing2 = new MyWing(this.scene, 30, 5);
        this.leg = new MyStem(this.scene, 0.5, 7, Math.PI / 2);
        this.foot = new MySphere(this.scene, 0.5, 30, 30);
        this.lowerArm = new MyStem(this.scene, 0.5, 4, Math.PI / 2);
    }

    display(){
        this.head.display();

        let bobyAppearance = new CGFappearance(this.scene);
        bobyAppearance.setTexture(this.bobyTexture);
        bobyAppearance.apply();


        this.scene.pushMatrix();
        this.scene.translate(0, -11, 0);
        this.boby.display();
        this.scene.popMatrix();

        let appearance = new CGFappearance(this.scene);
        appearance.apply();

        var rad = 180 * Math.PI / 180;
        var rotecone = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]
        
        this.scene.pushMatrix();
        this.scene.translate(0, -17, 0);
        this.scene.multMatrix(rotecone);
        this.cone.display();
        this.scene.popMatrix();

        //this.scene.setDiffuse(1.0, 1.0, 1.0, 0.2);
        this.scene.pushMatrix();
        this.scene.translate(7, -5, -2);
        this.scene.scale(1.3, 1, 1);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-7, -5, -2);
        this.scene.scale(1.3, 1, 1);
        this.wing2.display();
        this.scene.popMatrix();

        var rad = -90 * Math.PI / 180;
        var rotLeg = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.scene.pushMatrix();
        this.scene.multMatrix(rotLeg);
        this.scene.translate(3, 0, 15);
        this.leg.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(rotLeg);
        this.scene.translate(-3, 0, 15);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, -22, 0);
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -22, 0);
        this.foot.display();
        this.scene.popMatrix();

        /* Upper Arm */

        var rad = -90 * Math.PI / 180;
        var rotArm = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(3, -6.5, 0);
        this.scene.multMatrix(rotArm);
        this.leg.display();
        this.scene.popMatrix();

        var rad = 90 * Math.PI / 180;
        var rotArm = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0.0, 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(-3, -6.5, 0);
        this.scene.multMatrix(rotArm);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, -6.5, 0);
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-10, -6.5, 0);
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
        this.scene.translate(-10, -10.5, 0);
        this.scene.multMatrix(rotArm1);
        this.lowerArm.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, -10.5, 0);
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-10, -10.5, 0);
        this.foot.display();
        this.scene.popMatrix();

    }
}