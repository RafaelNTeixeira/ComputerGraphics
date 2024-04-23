import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyStem } from "./MyStem.js";

export class MyCylinder extends CGFobject {
    constructor(scene, radius, height){
        super(scene);
        this.height = height;
        this.stem = new MyStem(this.scene, radius, 2, Math.PI / 2);
        this.stem1 = new MyStem(this.scene, radius, 2, Math.PI);
        this.stem2 = new MyStem(this.scene, radius, 2, Math.PI);
    }

    display() {
        const times = this.height / 2;
        this.stem.display();
        var bot = 2;
        for (let i = 1; i < times; i++){
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
            }
            this.stem1.display();
            this.scene.popMatrix();
        }
        
    }

    setRadiusAndHeight(radius, height) {
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

}