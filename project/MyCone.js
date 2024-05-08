import { CGFobject } from '../lib/CGF.js';

export class MyCone extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i <= this.slices; i++) {
            let theta = (i * 2 * Math.PI) / this.slices;
            let x = Math.cos(theta);
            let z = Math.sin(theta);

            this.vertices.push(x * this.radius, 0, z * this.radius); // Bottom
            this.vertices.push(0, this.height, 0); // Top

            let normal = vec3.fromValues(x, 0, z);
            vec3.normalize(normal, normal);
            this.normals.push(...normal); // Bottom
            this.normals.push(...normal); // Top

            this.texCoords.push(0.5 + 0.5 * x, 0.5 + 0.5 * z); // Bottom
            this.texCoords.push(0.5, 0.5); // Top
        }

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(
                i * 2,
                (i + 1) * 2,
                i * 2 + 1,
                (i + 1) * 2,
                (i + 1) * 2 + 1,
                i * 2 + 1
            );
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
