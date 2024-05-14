import { CGFobject } from '../../lib/CGF.js';

export class MyGrass extends CGFobject {
    constructor(scene, width, height, curveFactor, x, z) {
        super(scene);
        this.width = width;
        this.height = height;
        this.curveFactor = curveFactor;
        this.x = x;
        this.z = z;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const numDivisions = 20;

        for (let i = 0; i <= numDivisions; i++) {
            const u = i / numDivisions;

            // x = x-position along the width
            // y = height of the grass leaf
            const x = this.x + (2 * u - 1) * this.width / 2;
            const y = this.height * Math.sin(u * Math.PI) * this.curveFactor;

            this.vertices.push(x, 0, this.z); // Upper grass vertice
            this.vertices.push(x, y, this.z); // Lower grass vertice
        }

        for (let i = 0; i < numDivisions; i++) {
            const baseIndex = i * 2;

            // Front face
            this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
            this.indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);

            // Back face
            this.indices.push(baseIndex + 2, baseIndex + 1, baseIndex);
            this.indices.push(baseIndex + 2, baseIndex + 3, baseIndex + 1);

            // Normals
            this.normals.push(0, 0, 1);  // Front face
            this.normals.push(0, 0, -1);  // Front face
            this.normals.push(0, 0, 1); // Back face
            this.normals.push(0, 0, -1); // Back face
        }

        for (let i = 0; i <= numDivisions; i++) {
            const u = i / numDivisions;
            this.texCoords.push(u, 1, u, 0); // Texture coordinates for front face
            this.texCoords.push(u, 0, u, 1); // Texture coordinates for back face
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
