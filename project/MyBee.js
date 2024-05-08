import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyBeeHead } from "./MyBeeHead.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyWing } from "./MyWing.js";
import { MyStem } from './MyStem.js';
import { MyBeeArm } from './MyBeeArm.js';

export class MyBee extends CGFobject {
    constructor(scene, x, y, z){
        super(scene);
        this.head = new MyBeeHead(this.scene);
        this.boby = new MySphere(this.scene, 7, 50, 50);
        this.bobyTexture = new CGFtexture(this.scene, 'images/bee/bee_stripe.png');
        this.cone = new MyCone(this.scene, 20, 4, 1);
        this.wing1 = new MyWing(this.scene, 30, 5);
        this.wing2 = new MyWing(this.scene, 30, 5);
        this.leg = new MyStem(this.scene, 0.5, 7, Math.PI / 2);
        this.foot = new MySphere(this.scene, 0.5, 30, 30);
        this.beeArm1 = new MyBeeArm(this.scene);
        this.beeArm2 = new MyBeeArm(this.scene);
        this.beeArm3 = new MyBeeArm(this.scene);
        this.beeArm4 = new MyBeeArm(this.scene);
        this.oscilatingMove = 0;
        this.wingAngle = 0;
        this.beeSizeFactor = 1;
        this.speed = 0;
        this.speedFactor = 1;
        this.position = {x: x, y: y, z: z};
        this.initialPosition = {x: x, y: y, z: z};
        this.beeAngle = 0;
        this.maximumSpeed = 4;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.beeAngle, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.2); // Correction to bee size
        this.scene.scale(this.beeSizeFactor, this.beeSizeFactor, this.beeSizeFactor);
        this.drawBee();
        this.scene.popMatrix();
    }

    drawBee() {
        this.scene.pushMatrix();
        this.scene.translate(0, -1, this.oscilatingMove-1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        let bobyAppearance = new CGFappearance(this.scene);
        bobyAppearance.setTexture(this.bobyTexture);
        bobyAppearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -11, this.oscilatingMove);
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
        this.scene.translate(0, -17, this.oscilatingMove);
        this.scene.multMatrix(rotecone);
        this.cone.display();
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
        this.scene.translate(3, this.oscilatingMove, 15);
        this.leg.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(rotLeg);
        this.scene.translate(-3, this.oscilatingMove, 15);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, -22, this.oscilatingMove);
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -22, this.oscilatingMove);
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-6, -7, this.oscilatingMove+14);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.beeArm1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(6, -7, this.oscilatingMove+14);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.beeArm2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-7, -14, this.oscilatingMove+14);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.beeArm3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(7, -14, this.oscilatingMove+14);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.beeArm4.display();
        this.scene.popMatrix();


        this.scene.setEmission(0.0, 0.0, 0.0, 0.0);
        this.scene.setDiffuse(0.0, 0.0, 0.0, 0.5);
        this.scene.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.setSpecular(0.0, 0.0, 0.0, 0.0);

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        this.scene.pushMatrix();
        this.scene.setShininess(1.0);
        this.scene.translate(5, -5, this.oscilatingMove-2);
        this.scene.rotate(this.wingAngle, 0, 1, 0);
        this.scene.scale(1.3, 1, 1);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-5, -5, this.oscilatingMove-2);
        this.scene.rotate(-this.wingAngle, 0, 1, 0);
        this.scene.scale(1.3, 1, 1);
        this.wing2.display();
        this.scene.popMatrix();
    }

    turn(v) {
        this.beeAngle += v;
    }

    accelerate(v) {
        if (this.speed + v <= 0) {
            this.speed = 0;
        }
        else if (this.speed + v >= this.maximumSpeed) {
            this.speed = this.maximumSpeed;
        }
        else {
            this.speed += v;
        }
    }

    reset() {
        this.speed = 0;
        this.beeAngle = 0;
        this.position = {
            x: this.initialPosition.x,
             y: this.initialPosition.y,
              z: this.initialPosition.z
            }
    }

    keysLogic(value) {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(value);
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-value/2);
        }
        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.reset();
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(value/3);
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-value/3);
        }
    }

    updateBee(t, speedFactor, beeSizeFactor) {
        if (!this.startTime) {
            this.startTime = t;
        }

        this.beeSizeFactor = beeSizeFactor;

        this.keysLogic(speedFactor/10);

        let directionX = Math.sin(this.beeAngle);
        let directionZ = Math.cos(this.beeAngle);

        this.position.x += directionX * this.speed/5;
        this.position.z += directionZ * this.speed/5;

        let elapsedTime = t - this.startTime;
    
        let amplitude = 5; 
        let frequency = 0.5;
    
        this.oscilatingMove = amplitude * Math.sin(2 * Math.PI * frequency * (elapsedTime / 1000));
    
        this.wingAngle = Math.sin(t * 0.05);
    }
    
}