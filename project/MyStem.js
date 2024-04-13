import { CGFappearance, CGFobject } from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers(){
        const numSegments = 30; // Number of segments to approximate the circular base of the cylinder
        const height = 2.5; // Height of the cylinder
        const radius = 0.2; // Radius of the circular base

        // Define vertices for the cylinder
        this.vertices = [];

        // Vertices for the bottom circular base
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            this.vertices.push(x, y, 0); // Bottom circular base
        }

        // Vertices for the top circular base
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            this.vertices.push(x, y, height); // Top circular base
        }

        // Vertex for the center of the bottom circular base
        this.vertices.push(0, 0, 0);

        // Vertex for the center of the top circular base
        this.vertices.push(0, 0, height);

        // Define indices to connect the vertices into triangles
        this.indices = [];

        // Indices for the bottom circular base
        for (let i = 0; i < numSegments - 1; i++) {
            this.indices.push(i, i + 1, 2 * numSegments); // Connect to the center of the bottom circular base
        }
        this.indices.push(numSegments - 1, 0, 2 * numSegments); // Connect the last vertex to the first vertex

        // Indices for the top circular base
        const offset = numSegments;
        for (let i = offset; i < 2 * numSegments - 1; i++) {
            this.indices.push(i, i + 1, offset + 1 + numSegments); // Connect to the center of the top circular base
        }
        this.indices.push(2 * numSegments - 1, offset, offset + 1 + numSegments); // Connect the last vertex to the first vertex

        // Indices for the side faces
        for (let i = 0; i < numSegments; i++) {
            const next = (i + 1) % numSegments;
            this.indices.push(i, next, i + offset);
            this.indices.push(next + offset, i + offset, next);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }    

}