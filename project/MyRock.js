import { CGFobject } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, radius, slices, stacks, viewInside = false) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.viewInside = viewInside ? -1 : 1;
        this.initBuffers();
    }

    /**
     * Initializes the buffers for the rock.
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angSlice = 2 * Math.PI / this.slices;
        const angStack = Math.PI / this.stacks;

        const displacementFactor = 0.1; // Control the depth of protrusions and indentations

        for (let i = 0; i <= this.stacks; i++) {
            const stackRadius = Math.sin(i * angStack) * this.radius;
            const stackY = Math.cos(i * angStack) * this.radius;

            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * angSlice) * stackRadius;
                const z = Math.sin(j * angSlice) * stackRadius;

                const nx = (x / this.radius) * this.viewInside;
                const ny = (stackY / this.radius) * this.viewInside;
                const nz = (z / this.radius) * this.viewInside;

                // Displace the vertex along its normal
                const dx = nx * displacementFactor;
                const dy = ny * displacementFactor;
                const dz = nz * displacementFactor;

                this.vertices.push(x + dx, stackY + dy, z + dz);
                this.normals.push(nx, ny, nz);
                this.texCoords.push(j / this.slices, i / this.stacks);

                if (i < this.stacks && j < this.slices) {
                    const current = i * (this.slices + 1) + j;
                    const next = current + this.slices + 1;
                    if (this.viewInside === -1) {
                        this.indices.push(current, next, current + 1);
                        this.indices.push(next, next + 1, current + 1);
                    } else {
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
