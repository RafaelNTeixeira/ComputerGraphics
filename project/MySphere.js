import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks, viewInside=false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.viewInside = viewInside ? -1 : 1;
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
        
        const angSlice = 2 * Math.PI / this.slices; // Angular division for slicing the sphere horizontally (around the equator)
        const angStack = Math.PI / (this.stacks); // Angular division for slicing the sphere vertically (pole to pole)

        // Iterate over each stack and slice to calculate the vertices, normals and texture coordinates
        for (let i = 0; i <= this.stacks; i++) {
            const stackRadius = Math.sin(i * angStack) * this.radius;
            const stackY = Math.cos(i * angStack) * this.radius;

            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * angSlice) * stackRadius;
                const z = Math.sin(j * angSlice) * stackRadius;

                // Normal coord values of current slice
                const nx = (x / this.radius) * this.viewInside; // Normalized
                const ny = (stackY / this.radius) * this.viewInside;  // Normalized. All the slices in a stack have the same Y value of the current stack
                const nz = (z / this.radius) * this.viewInside; // Normalized
    
                // Add the vertex, normal, and texture coordinate to their respective arrays
                this.vertices.push(x, stackY, z);
                this.normals.push(nx, ny, nz);
                
                this.texCoords.push(-j / this.slices, i / this.stacks);

                // Create the indices for the current slice and stack
                if (i < this.stacks && j < this.slices) {
                    const current = i * (this.slices) + j;
                    const next = current + this.slices + 1;
                    this.indices.push(current + 1, next, current);
                    this.indices.push(current + 1, next + 1, next);
                }
            }
        }

        // Connect north pole to first stack
        this.vertices.push(0, this.radius, 0);
        this.normals.push(0, 1 * this.viewInside, 0);
        this.texCoords.push(0.5, 0);
        const northPoleIndex = this.vertices.length / 3 - 1;
        
        // Connect south pole to last stack
        this.vertices.push(0, -this.radius, 0);
        this.normals.push(0, -1 * this.viewInside, 0);
        this.texCoords.push(0.5, 1);
        const southPoleIndex = this.vertices.length / 3 - 1;

        // Connect the north pole with the first stack
        for (let j = 0; j < this.slices; j++) {
            const firstVertexIndex = j;
            const secondVertexIndex = j + 1;
            const thirdVertexIndex = northPoleIndex; // To connect to the north pole

            this.indices.push(firstVertexIndex, secondVertexIndex, thirdVertexIndex);
        }
        
        // Connect the south pole with the last stack
        const lastIndex = (this.stacks - 1) * (this.slices + 1);
        for (let j = 0; j < this.slices; j++) {
            const firstVertexIndex = lastIndex + j;
            const secondVertexIndex = lastIndex + j + 1;
            const thirdVertexIndex = southPoleIndex; // To connect to the south pole

            this.indices.push(firstVertexIndex, secondVertexIndex, thirdVertexIndex);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
