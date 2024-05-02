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

        // Define angle increment for segments
        const angIncrement = Math.PI / this.segments;

        // Iterate over each segment to calculate vertices and normals
        for (let i = 0; i <= this.segments; i++) {
            const x = this.thickness * Math.cos(i * angIncrement);
            const y = this.length * (i / this.segments);
            const z = this.thickness * Math.sin(i * angIncrement);

            // Add vertices
            this.vertices.push(x, y, z);

            // Calculate normal (in this case, the tangent to the curve)   
            const normal = [Math.cos(i * angIncrement), 0, -Math.sin(i * angIncrement)];

            // Add normals
            this.normals.push(...normal);

            // Add texture coordinates (optional, since this is a simple shape)
            this.texCoords.push(i / this.segments, 0); // Assuming texture is along the length

            // Create indices
            if (i > 0) {
                this.indices.push(i - 1, i);
            }
        }

        this.primitiveType = this.scene.gl.LINES; // Adjust primitive type for lines
        this.initGLBuffers();
    }
}