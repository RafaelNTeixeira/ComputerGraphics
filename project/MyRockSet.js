import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene){
        super(scene);
        this.rocks = []; // Array to store the rock instances
        this.rockTexture = new CGFtexture(this.scene, 'images/rock.jpg');
        
        // Create a stack of 5 rocks
        for(let i = 0; i < 5; i++) {
            let rock = new MyRock(this.scene, 3, 10, 10, false);
            this.rocks.push(rock);
        }
    }

    display() {
        let baseSize = 4;
        let spacing = 4;

        for (let i = 0; i < this.rocks.length; i++) {
            let rock = this.rocks[i];

            // Set the texture for each rock
            let rockAppearance = new CGFappearance(this.scene);
            rockAppearance.setTexture(this.rockTexture);
            rockAppearance.apply();

            this.scene.pushMatrix();
            // Calculate the x-position based on the row and the base size
            let xPos = -baseSize / 2 + i * spacing;
            // Calculate the z-position based on the row
            let zPos = -i * spacing;
            // Translate the rock to its position
            this.scene.translate(xPos, 0, zPos);
            this.scene.scale(1, 0.8, 1.2);

            rock.display();

            this.scene.popMatrix();
        }

    
    }
}
