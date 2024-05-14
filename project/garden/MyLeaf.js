import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";

export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.stem = new MyStem(this.scene, 0.2, 0.5, 0);
        this.petal = new MyPetal(this.scene);
    }
}
