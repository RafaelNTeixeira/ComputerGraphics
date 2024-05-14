import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene){
        super(scene);
        this.rocks = [];
        this.rockTexture = new CGFtexture(this.scene, 'images/rock.jpg');
        this.rockTexture1 = new CGFtexture(this.scene, 'images/rock1.jpg');
        
        for(let i = 0; i < 10; i++) {
            let rock = new MyRock(this.scene, 2, 10, 10, false);
            this.rocks.push(rock);
        }
    }

    display() {
        // Rock 1
        this.displayRockAtRandomPosition(this.rocks[0], 10, Math.PI / 2, 2, true);

        // Rock 2
        this.displayRockAtRandomPosition(this.rocks[1], 6, -Math.PI, 1.5);

        // Rock 3
        this.displayRockAtRandomPosition(this.rocks[2], 0, Math.PI / 4, 0.6);

        // Rock 4
        this.displayRockAtRandomPosition(this.rocks[3], 20, Math.PI / 4, 1, true);

        // Rock 5
        this.displayRockAtRandomPosition(this.rocks[4], 10, Math.PI / 5, 1.2, true);

        // Rock 6
        this.displayRockAtRandomPosition(this.rocks[5], 5, Math.PI / 8, 0.8);

        // Rock 7
        this.displayRockAtRandomPosition(this.rocks[6], 15, Math.PI / 7, 0.9);

        // Rock 8
        this.displayRockAtRandomPosition(this.rocks[7], 7,  - Math.PI / 2, 1.7, true);

        // Rock 9
        this.displayRockAtRandomPosition(this.rocks[8], 10,  - Math.PI / 4, 1.1);

        // Rock 10
        this.displayRockAtRandomPosition(this.rocks[9], 15,  - Math.PI / 2, 1.3, true);
    }

    displayRockAtRandomPosition(rock, radius, angle, scale, texture = false) {
        let rockAppearance = new CGFappearance(this.scene);
        if (texture){
            rockAppearance.setTexture(this.rockTexture);
            rockAppearance.apply();
        } else {
            rockAppearance.setTexture(this.rockTexture1);
            rockAppearance.apply();
        }
        
        this.scene.pushMatrix();

        let xPos = radius * Math.cos(angle);
        let zPos = radius * Math.sin(angle);

        this.scene.translate(xPos, 0, zPos);
        this.scene.scale(1 * scale, 0.8 * scale, 1.2 * scale);

        rock.display();

        this.scene.popMatrix();
    }
}
