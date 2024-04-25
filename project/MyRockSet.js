import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene){
        super(scene);
        this.rocks = [];
        this.rockTexture = new CGFtexture(this.scene, 'images/rock.jpg');
        
        for(let i = 0; i < 10; i++) {
            let rock = new MyRock(this.scene, 2, 10, 10, false);
            this.rocks.push(rock);
        }
    }

    display() {
        // Rock 1
        this.displayRockAtRandomPosition(this.rocks[0], 10, Math.PI / 2);

        // Rock 2
        this.displayRockAtRandomPosition(this.rocks[1], 5, Math.PI);

        // Rock 3
        this.displayRockAtRandomPosition(this.rocks[2], 0, Math.PI / 4);

        // Rock 4
        this.displayRockAtRandomPosition(this.rocks[3], 20, Math.PI / 4);

        // Rock 5
        this.displayRockAtRandomPosition(this.rocks[4], 10, Math.PI / 5);

        // Rock 6
        this.displayRockAtRandomPosition(this.rocks[5], 5, Math.PI / 8);

        // Rock 7
        this.displayRockAtRandomPosition(this.rocks[6], 15, Math.PI / 7);

        // Rock 8
        this.displayRockAtRandomPosition(this.rocks[7], 7,  - Math.PI / 2);

        // Rock 9
        this.displayRockAtRandomPosition(this.rocks[8], 10,  - Math.PI / 4);

        // Rock 10
        this.displayRockAtRandomPosition(this.rocks[9], 15,  - Math.PI / 2);
    }

    displayRockAtRandomPosition(rock, radius, angle) {
        let rockAppearance = new CGFappearance(this.scene);
        rockAppearance.setTexture(this.rockTexture);
        rockAppearance.apply();

        this.scene.pushMatrix();

        let xPos = radius * Math.cos(angle);
        let zPos = radius * Math.sin(angle);

        this.scene.translate(xPos, 0, zPos);
        this.scene.scale(1, 0.8, 1.2);

        rock.display();

        this.scene.popMatrix();
    }
}
