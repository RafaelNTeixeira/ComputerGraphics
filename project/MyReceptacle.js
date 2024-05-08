import { CGFappearance, CGFobject } from '../lib/CGF.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
		super(scene);
        this.radius = radius;
		this.initBuffers();
	}

    initBuffers() {
        const numSegments = 50;

        this.vertices = [];
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);
            this.vertices.push(x, y, 0);
        }

        this.indices = [];
        for (let i = 1; i < numSegments - 1; i++) {
            this.indices.push(0, i, i + 1);
        }

        this.texCoords = [];
        for (let i = 0; i < numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const s = 0.5 + 0.5 * Math.cos(theta); 
            const t = 0.5 + 0.5 * Math.sin(theta);
            this.texCoords.push(s, t);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    setRadius(radius) {
        this.radius = radius;
        this.initBuffers();
    }
}