import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    /**
     * Initializes the buffers for the sphere.
     * This function calculates the vertices, normals, texture coordinates, and indices for the sphere.
     * It uses the number of slices and stacks provided in the constructor to determine the shape of the sphere.
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        const angSlice = 2 * Math.PI / this.slices; // Angular increment for slicing the sphere horizontally (around the equator)
        const angStack = Math.PI / (this.stacks); // Angular increment for slicing the sphere vertically (pole to pole)

        // Iterate over each stack and slice to calculate the vertices, normals, and texture coordinates
        for (let i = 0; i <= this.stacks; i++) {
            const stackRadius = Math.sin(i * angStack);
            const stackY = Math.cos(i * angStack);

            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * angSlice);
                const z = Math.sin(j * angSlice);

                // Normal coord values of current slice
                const nx = stackRadius * x;
                const ny = stackY;  // All the slices in a stack have the same Y value of the current stack
                const nz = stackRadius * z;
    
                // Add the vertex, normal, and texture coordinate to their respective arrays
                // Vertices are in places that point directly outwards from the center of the sphere so their values are utilized for the normals too
                this.vertices.push(nx, ny, nz);
                this.normals.push(nx, ny, nz);
                this.texCoords.push(j / this.slices, i / this.stacks);

                // Create the indices for the current slice and stack
                if (i < this.stacks && j < this.slices) {
                    const current = i * (this.slices + 1) + j;
                    const next = current + this.slices + 1;
                    this.indices.push(current + 1, next, current);
                    this.indices.push(current + 1, next + 1, next);
                }
            }
        }

        // Connect north pole to first stack
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0);
        const northPoleIndex = this.vertices.length / 3 - 1;
        
        // Connect south pole to last stack
        this.vertices.push(0, -1, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 1);
        const southPoleIndex = this.vertices.length / 3 - 1;

        // Connect the north pole with the first stack
        for (let j = 0; j < this.slices; j++) {
            const firstVertexIndex = j;
            const secondVertexIndex = j + 1;
            const thirdVertexIndex = northPoleIndex;

            this.indices.push(firstVertexIndex, secondVertexIndex, thirdVertexIndex);
        }
        
        // Connect the south pole with the last stack
        const lastIndex = (this.stacks - 1) * (this.slices + 1);
        for (let j = 0; j < this.slices; j++) {
            const firstVertexIndex = lastIndex + j;
            const secondVertexIndex = lastIndex + j + 1;
            const thirdVertexIndex = southPoleIndex;

            this.indices.push(firstVertexIndex, secondVertexIndex, thirdVertexIndex);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
