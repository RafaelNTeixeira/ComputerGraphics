import { CGFobject } from '../lib/CGF.js';

export class MyWing extends CGFobject {
    constructor(scene, slices, radius) {
        super(scene);
        this.slices = slices;
        this.radius = radius; 
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        // Center vertex
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);
    
        // Angle between each slice
        let angle = (2 * Math.PI) / this.slices;
    
        // Generate vertices, normals, and texture coordinates for one side
        for (let i = 0; i < this.slices + 1; i++) {
            let x = Math.cos(i * angle) * this.radius;
            let y = Math.sin(i * angle) * this.radius;
    
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 * (1 + x / this.radius), 0.5 * (1 - y / this.radius));
        }
    
        // Duplicate vertices, normals, and texture coordinates for the other side
        for (let i = this.vertices.length - 1; i > 0; i -= 3) {
            this.vertices.push(this.vertices[i - 2], this.vertices[i - 1], this.vertices[i]);
            this.normals.push(0, 0, -1); // Invert normals for the other side
            this.texCoords.push(this.texCoords[i - 2], this.texCoords[i - 1]);
        }

        for (let i = 1; i <= this.slices; i++) {
            // Front face indices
            this.indices.push(0, i, i % this.slices + 1);
            // Back face indices
            this.indices.push(this.slices + 1, this.slices + 1 + i, this.slices + 1 + i % this.slices + 1);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
