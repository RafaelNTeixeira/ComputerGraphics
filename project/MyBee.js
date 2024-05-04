import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyBeeHead } from "./MyBeeHead.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyWing } from "./MyWing.js";

export class MyBee extends CGFobject {
    constructor(scene){
        super(scene);
        this.head = new MyBeeHead(this.scene);
        this.boby = new MySphere(this.scene, 7, 50, 50);
        this.bobyTexture = new CGFtexture(this.scene, 'images/bee/bee_stripe.png');
        this.cone = new MyCone(this.scene, 20, 5, 1);
        this.wing1 = new MyWing(this.scene, 30, 5);
        this.wing2 = new MyWing(this.scene, 30, 5);
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
        this.scene.translate(7, -5, 0);
        this.scene.scale(1.3, 1, 1);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-7, -5, 0);
        this.scene.scale(1.3, 1, 1);
        this.wing2.display();
        this.scene.popMatrix();

    }
}