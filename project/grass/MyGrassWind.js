import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
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
    }

    display() {
        //this.scene.setActiveShader(this.scene.grassShader);

        let timeFactor = Math.sin(2 * Math.PI * this.timeSinceAppStart);
        let diffAngle = (this.windAngle * 2 * Math.PI) / 360;

        //this.scene.grassShader.setUniformsValues( { timeFactor: timeFactor, angle: diffAngle, strength: this.windStrength } );
        this.grass.display();
        //this.scene.setActiveShader(this.scene.defaultShader);

       
    }

    update(time, angle, strength) {
        this.time = time;
        this.angle = angle;
        this.strength = strength;
    }
}