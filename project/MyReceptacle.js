import { CGFappearance, CGFobject } from '../lib/CGF.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
		super(scene);
        this.radius = radius;
		this.initBuffers();
	}

    initBuffers() {
        const numSegments = 50; // Number of segments to approximate the circle
        //this.radius = 0.5;

        // Define vertices for the circle
        this.vertices = [];
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = this.radius * Math.cos(theta); // Scale down the x coordinate
            const y = this.radius * Math.sin(theta); // Scale down the y coordinate
            this.vertices.push(x, y, 0);
        }

        // Define indices to connect the vertices into triangles
        this.indices = [];
        for (let i = 1; i < numSegments - 1; i++) {
            this.indices.push(0, i, i + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    setRadius(radius) {
        this.radius = radius;
        this.initBuffers();
    }

}