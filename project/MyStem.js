import { CGFappearance, CGFobject } from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, radius, height, obliquity) {
		super(scene);
        this.radius = radius;
        this.height = height;
        this.obliquity = obliquity; // Obliquity angle in radians
		this.initBuffers();
	}

    initBuffers(){
        const numSegments = 30;
        this.vertices = [];
        this.texCoords = [];

        // Vertices - Bottom circular base
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);
            const z = 0; // Bottom is at z = 0
            this.vertices.push(x, y, z); // Bottom circular base
            this.texCoords.push(i / numSegments, 0);
        }

        // Vertices - Top circular base
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);
            const z = this.height; // Top is at z = height
            this.vertices.push(x + Math.cos(this.obliquity), y, z); // Top circular base
            this.texCoords.push(i / numSegments, 1);
        }

        this.indices = [];

        // Indices - Bottom circular base
        for (let i = 0; i < numSegments - 1; i++) {
            this.indices.push(i, i + 1, numSegments); // Connect to the center of the bottom circular base
        }
        this.indices.push(numSegments - 1, 0, numSegments);

        // Indices - Top circular base
        const offset = numSegments;
        for (let i = 0; i < numSegments - 1; i++) {
            this.indices.push(i, i + 1, numSegments - 1); // Connect to the center of the top circular base
        }
        this.indices.push(numSegments - 1, 0, numSegments);

        // Indices - Side faces
        for (let i = 0; i < numSegments; i++) {
            const next = (i + 1) % numSegments;
            this.indices.push(i, next, i + offset);
            this.indices.push(next + offset, i + offset, next);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }    

    setRadius(radius) {
        this.radius = radius;
        this.initBuffers();
    }
}