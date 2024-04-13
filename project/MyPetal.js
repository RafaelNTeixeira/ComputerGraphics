import { CGFappearance, CGFobject } from '../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers(){
        this.vertices = [
            -1, -1, 0,  // 0
            1, -1, 0,   // 1
            0, 1, 0,    // 2
            0, -3, 0    // 3
        ];
    
        // Define the indices for each triangular face
        this.indices = [
            0, 1, 2,    
            3, 1, 0     
        ];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}