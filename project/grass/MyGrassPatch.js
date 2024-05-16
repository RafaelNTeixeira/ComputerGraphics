import { CGFobject } from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';
import { MyGrassWind } from './MyGrassWind.js';

export class MyGrassPatch extends CGFobject {
    constructor(scene, width, height, numStrips, curveFactor, numRows, numCols) {
        super(scene);
        this.width = width;
        this.height = height;
        this.numStrips = numStrips;
        this.curveFactor = curveFactor;
        this.numRows = numRows;
        this.numCols = numCols;

        this.grassStrips = [];

        this.initGrassStrips();
    }

    initGrassStrips() {
        const stripWidth = this.width / this.numStrips;
        const rowSpacing = this.width / this.numRows;
        const colSpacing = this.width / this.numCols;

        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const x = col * colSpacing + Math.random() * colSpacing;
                const z = row * rowSpacing + Math.random() * rowSpacing;
                const height = Math.random() * this.height;

                const grassStrip = new MyGrassWind(this.scene, stripWidth, height, this.curveFactor, x, z);

                this.grassStrips.push(grassStrip);
            }
        }
    }

    display() {
        for (let i = 0; i < this.grassStrips.length; i++) {
            this.grassStrips[i].display();
        }
    }

    update(timeSinceAppStart, windAngle, windStrength) {
        for (let i = 0; i < this.grassStrips.length; i++) {
            this.grassStrips[i].update(timeSinceAppStart, windAngle, windStrength);
        }
    }
}
