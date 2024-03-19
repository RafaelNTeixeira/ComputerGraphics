import {CGFobject} from '../lib/CGF.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	// 0 - Bottom-Left Front Vertice
			-0.5, -0.5, -0.5,	// 1 - Bottom-Left Back Vertice
			0.5, -0.5, -0.5,    // 2 - Bottom-Right Back Vertice
            0.5, -0.5, 0.5      // 3 - Bottom-Right Front Vertice
            ,
            -0.5, 0.5, 0.5,	    // 4 - Top-Left Front Vertice
			-0.5, 0.5, -0.5,	// 5 - Top-Left Back Vertice
			0.5, 0.5, -0.5,     // 6 - Top-Right Back Vertice
            0.5, 0.5, 0.5       // 7 - Top-Right Front Vertice
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			// Bottom
			0, 1, 2,
            2, 3, 0,
			
			// Left
            1, 0, 4,
            4, 5, 1,

            // Right
            3, 2, 6,
            6, 7, 3,

            // Back
            1, 5, 6,
            6, 2, 1,

            // Front
            0, 3, 7,
            7, 4, 0, 
			
            // Top
            4, 7, 6,
            6, 5, 4,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

