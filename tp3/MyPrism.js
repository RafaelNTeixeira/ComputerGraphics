import {CGFobject} from '../lib/CGF.js';
/**
 * MyMyPrism 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var index = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for(var i = 0; i < this.slices; i++){

            let x1 = Math.cos(i * alphaAng);
            let y1 = Math.sin(i * alphaAng);
            let x2 = Math.cos((i + 1) * alphaAng);
            let y2 = Math.sin((i + 1) * alphaAng);

            let increment = 1 / this.stacks;

            for(var j = 0; j < this.stacks; j++){

                let x = Math.cos((i + 0.5) * alphaAng);
                let y = Math.sin((i + 0.5) * alphaAng);
                let len = Math.sqrt(x * x + y * y);

                this.vertices.push(x1, y1, increment * j, x2, y2, increment * j, x1, y1, increment * (j + 1), x2, y2, increment * (j + 1));
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(x/len, y/len, 0, x/len, y/len, 0, x/len, y/len, 0, x/len, y/len, 0);
                index += 4;
            }
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity);
        
        this.initBuffers();
        this.initNormalVizBuffers();
    }
    
}

