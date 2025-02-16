import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, panoramaTexture) {
        super(scene);
        this.sphere = new MySphere(this.scene, 200, 50, 50, true);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setEmission(1, 1, 1, 1);
        this.appearance.setTexture(panoramaTexture);
        this.scaleFactor = 1;
    }
    
    display() {
        this.scene.pushMatrix();
        this.appearance.apply();

        if (this.scene.infiniteView)
            this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])

        if (this.scene.displayNormals) {
            this.sphere.enableNormalViz();
        }
        else {
            this.sphere.disableNormalViz();
        }

        this.sphere.display()
        this.scene.popMatrix();
    }
    
}
