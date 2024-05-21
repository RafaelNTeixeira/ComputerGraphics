import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class MyGrassPatch extends CGFobject {
    constructor(scene, width, height, numStrips, curveFactor, numRows, numCols) {
        super(scene);
        this.width = width;
        this.height = height;
        this.numStrips = numStrips;
        this.curveFactor = curveFactor;
        this.numRows = numRows;
        this.numCols = numCols;
        this.time = 0;
        this.angle = 0;
        this.strength = 0;
        this.grass = new MyGrass(this.scene, this.width, this.height, this.curveFactor, this.x, this.z);
        this.grassShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");

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

                const grassStrip = new MyGrass(this.scene, stripWidth, height, this.curveFactor, x, z);

                this.grassStrips.push(grassStrip);
            }
        }
    }

    display() {
        this.scene.setActiveShader(this.grassShader);

        this.grassShader.setUniformsValues({
            timeFactor: (this.time - this.startTime) / 1000,
            angle: (this.angle * 2 * Math.PI) / 360,
            strength: this.strength,
            grassColor: [0, 0.2, 0, 1]
        });

        for (let i = 0; i < this.grassStrips.length; i++) {
            this.grassStrips[i].display();
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(time, angle, strength) {
        if (!this.startTime) {
            this.startTime = time;
        }

        this.time = time;
        this.angle = angle;
        this.strength = strength;
    }
}
