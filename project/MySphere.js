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
        const angStack = Math.PI / this.stacks; // Angular division for slicing the sphere vertically (pole to pole)

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
                if (i <= this.stacks && j <= this.slices) {
                    const current = i * (this.slices) + j;
                    const next = current + this.slices + 1;
                    if (this.viewInside == -1) {
                        this.indices.push(current, next, current+1);
                        this.indices.push(next, next + 1, current+1);
                    }
                    else{
                        this.indices.push(current + 1, next, current);
                        this.indices.push(current + 1, next + 1, next);
                    }
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
