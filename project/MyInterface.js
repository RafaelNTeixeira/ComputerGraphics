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

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display normals");
        this.gui.add(this.scene, 'displayPanorama').name("Display Panorama");
        //this.gui.add(this.scene, 'centerView').name("Center View");

        //Slider element in GUI
        //this.gui.add(this.scene, 'scaleFactor', 0.1, 1).name('Scale Factor');

        return true;
    }
}