import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    calculateSliceProperties(i) {
        const angle = 2 * Math.PI * i / this.slices;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const vector_size = Math.sqrt(x * x + y * y);
        return { x, y, vector_size };
    }

    calculateIndices(points) {
        const indexC = points - 2;
        const indexD = points - 1;
        const indexB = indexD - (this.stacks + 1);
        const indexA = indexB - 1;
        return [indexA, indexC, indexD, indexA, indexD, indexB];
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (let z = 0; z <= this.stacks; z++) {
            this.vertices.push(1, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
        }

        for (let i = 1; i <= this.slices; i++) {
            const { x, y, vector_size } = this.calculateSliceProperties(i);

            if (i != this.slices) {
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
            }

            for (let j = 1; j <= this.stacks; j++) {
                if (i != this.slices) {
                    const z = j / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);

                    const points = this.vertices.length / 3;
                    this.indices.push(...this.calculateIndices(points));
                } else {
                    const points = this.vertices.length / 3;
                    const indexC = j - 1;
                    const indexD = j;
                    const indexB = points - this.stacks - 1 + j;
                    const indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}