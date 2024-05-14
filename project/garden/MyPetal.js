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
            0, -3, this.angle,    // 3
            // Back face
            -1, -1, 0,  // 4
            1, -1, 0,   // 5
            0, 1, 0 ,    // 6
            0, -3, this.angle    // 7
        ];
        
        this.indices = [
            // Front face
            0, 1, 2,    
            3, 1, 0,
            // Back face
            6, 5, 4,
            4, 5, 7,
        ];

        this.normals = [
            // Front face
            0, 0, 1,    // 0
            0, 0, 1,    // 1
            0, 0, 1,    // 2
            0, 0, 1,    // 3
            // Back face
            0, 0, -1,   // 4
            0, 0, -1,   // 5
            0, 0, -1,   // 6
            0, 0, -1    // 7
        ];

        this.texCoords = [
            // Front face
            0, 0,   // 0
            1, 0,   // 1
            0.5, 1, // 2
            0.5, 0, // 3
            // Back face
            0, 0,   // 4
            1, 0,   // 5
            0.5, 1, // 6
            0.5, 0, // 7
        ];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}
