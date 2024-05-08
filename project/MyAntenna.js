import { CGFobject } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyAntenna extends CGFobject {
    constructor(scene, length, segments) {
        super(scene);
        this.length = length;
        this.thickness = 1;
        this.segments = segments;
        this.sphere = new MySphere(this.scene, 0.15, 20, 20);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angIncrement = Math.PI / this.segments;

        for (let i = 0; i <= this.segments; i++) {
            const x = this.thickness * Math.cos(i * angIncrement);
            const y = this.length * (i / this.segments);
            const z = this.thickness * Math.sin(i * angIncrement);

            this.vertices.push(x, y, z);

            // Calculate normal (tangent to the curve)   
            const normal = [Math.cos(i * angIncrement), 0, -Math.sin(i * angIncrement)];

            this.normals.push(...normal);

            this.texCoords.push(i / this.segments, 0);

            if (i > 0) {
                this.indices.push(i - 1, i);
            }
        }

        this.primitiveType = this.scene.gl.LINES;
        this.initGLBuffers();
    }
}