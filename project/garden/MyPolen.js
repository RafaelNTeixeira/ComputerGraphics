import { CGFobject } from '../../lib/CGF.js';

export class MyPolen extends CGFobject {
    constructor(scene, radius, slices, stacks, viewInside=false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.viewInside = viewInside ? -1 : 1;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        const angSlice = 2 * Math.PI / this.slices; // Angular division for slicing the sphere horizontally (around the equator)
        const angStack = Math.PI / this.stacks; // Angular division for slicing the sphere vertically (pole to pole)

        for (let i = 0; i <= this.stacks; i++) {
            const stackRadius = Math.sin(i * angStack) * this.radius;
            const stackY = Math.cos(i * angStack) * this.radius;

            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * angSlice) * stackRadius;
                const z = Math.sin(j * angSlice) * stackRadius;

                const nx = (x / this.radius) * this.viewInside;
                const ny = (stackY / this.radius) * this.viewInside;
                const nz = (z / this.radius) * this.viewInside;

                this.vertices.push(x, stackY, z);
                this.normals.push(nx, ny, nz);
                this.texCoords.push(j / this.slices, i / this.stacks);

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

        this.applyScaleFactors(); // Apply scale factors to vertices

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    applyScaleFactors() {
        // Apply different scale factors along the y-axis to simulate an elongated shape
        for (let i = 0; i < this.vertices.length; i += 3) {
            if (this.vertices[i + 1] > 0) {
                // Upper hemisphere
                this.vertices[i + 1] *= 1.2;
            } else {
                // Lower hemisphere
                this.vertices[i + 1] *= 0.8;
            }
        }
    }
}