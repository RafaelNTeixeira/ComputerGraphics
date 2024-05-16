import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class MyGrassWind extends CGFobject {
    constructor(scene, width, height, curveFactor, x, z) {
        super(scene);
        this.width = width;
        this.height = height;
        this.curveFactor = curveFactor;
        this.x = x;
        this.z = z;
        this.time = 0;
        this.angle = 0;
        this.strength = 0;
        this.grass = new MyGrass(this.scene, this.width, this.height, this.curveFactor, this.x, this.z);
        this.grassShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
    }

    display() {
        this.scene.setActiveShader(this.grassShader);
        
        this.grassShader.setUniformsValues({
            timeFactor: Math.sin(2 * Math.PI * this.time),
            angle: (this.angle * 2 * Math.PI) / 360,
            strength: this.strength,
            grassColor: [0, 0.2, 0, 1]
        });
    
        this.grass.display();
        
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    
    update(time, angle, strength) {
        this.time = time;
        this.angle = angle;
        this.strength = strength;
    }
}