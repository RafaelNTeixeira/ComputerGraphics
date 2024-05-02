import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyAntenna } from "./MyAntenna.js";
import { MySmile } from "./MySmile.js";

export class MyBeeHead extends CGFobject {
    constructor(scene){
        super(scene);
        this.head = new MySphere(this.scene, 5, 20, 20);
        this.headTexture = new CGFtexture(this.scene, 'images/bee/head.png');
        this.eye1 = new MySphere(this.scene, 1, 20, 20);
        this.eye2 = new MySphere(this.scene, 1, 20, 20);
        this.eyeTexture = new CGFtexture(this.scene, 'images/bee/eye.png');
        this.antenna1 = new MyAntenna(this.scene, 2, 20);
        this.antenna2 = new MyAntenna(this.scene, 2, 20);
        this.antennaSphere1 = new MySphere(this.scene, 0.25, 20, 20);
        this.antennaSphere2 = new MySphere(this.scene, 0.25, 20, 20);
        this.smile = new MySmile(this.scene, 5, 20);
    }
    display(){
        let headAppearance = new CGFappearance(this.scene);
        headAppearance.setTexture(this.headTexture);
        headAppearance.apply();
        this.head.display();

        let eyeAppearance = new CGFappearance(this.scene);
        eyeAppearance.setTexture(this.eyeTexture);
        eyeAppearance.apply();

        var rad = -80 * Math.PI / 180;
        var roteye1 = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0., 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        var rad = -100 * Math.PI / 180;
        var roteye2 = [
            Math.cos(rad), 0.0, Math.sin(rad), 0.0, 
            0.0, 1.0, 0., 0.0,
            -Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        var rad = -90 * Math.PI / 180;
        var rotsmile = [
            Math.cos(rad), -Math.sin(rad), 0.0, 0.0, 
            Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        this.scene.pushMatrix();
        this.scene.translate(-2, 1.5, 4.1);
        this.scene.multMatrix(roteye1);
        this.eye1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 1.5, 4.1);
        this.scene.multMatrix(roteye2);
        this.eye2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4, 4.5, 0);
        this.scene.scale(2, 2, 2);
        this.antenna1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(4, 4.5, 0);
        this.scene.scale(-2, 2, 2);
        this.antenna2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(6, 8.5, 0);
        this.antennaSphere1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-6, 8.5, 0);
        this.antennaSphere2.display();
        this.scene.popMatrix();

        this.scene.setDiffuse(1, 0.1, 0.1, 1.0);
        this.scene.pushMatrix();
        this.scene.scale(5, 3, 5);
        this.scene.translate(0.25, 0, 0.985);
        this.scene.multMatrix(rotsmile);
        this.smile.display();
        this.scene.popMatrix();


        
    }
}