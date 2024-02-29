import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -2, 0, 0,   //0
            0, 2, 0,    //1
            2, 0, 0,    //2
			-2, 0, 0,   //3
            0, 2, 0,    //4
            2, 0, 0     //5
			,
			-2, 0, 0,   //6
            0, 2, 0,    //7
            2, 0, 0,    //8
			-2, 0, 0,   //9
            0, 2, 0,    //10
            2, 0, 0,    //11
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            2, 1, 0,
			3, 4, 5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
			,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

