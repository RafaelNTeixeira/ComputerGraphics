import { CGFappearance, CGFobject } from '../../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, angle) {
        super(scene);
        this.angle = angle;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Front face
            -1, -1, 0,  // 0
            1, -1, 0,   // 1
            0, 1, 0,    // 2
            // Back face
            -1, -1, 0,  // 3
            1, -1, 0,   // 4
            0, 1, 0     // 5
        ];
        
        this.indices = [
            // Front face
            0, 1, 2,
            // Back face
            5, 4, 3
        ];

        this.normals = [
            // Front face
            0, 0, 1,    // 0
            0, 0, 1,    // 1
            0, 0, 1,    // 2
            // Back face
            0, 0, -1,   // 3
            0, 0, -1,   // 4
            0, 0, -1    // 5
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1,
            0, 0,
            1, 0,
            0.5, 1
        ];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}
