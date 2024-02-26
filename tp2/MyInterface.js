import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        // Boolean controls in GUI to toggle visibility of scene elements
        this.gui.add(this.scene, 'tangramVisible').name('Tangram Visible');
        this.gui.add(this.scene, 'cubeVisible').name('Cube Visible');
        this.gui.add(this.scene, 'cubeQuadVisible').name('CubeQuad Visible');
        
        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}