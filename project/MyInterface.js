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
        this.gui.add(this.scene, 'displayFlower').name("Display Flower");
        var f0 = this.gui.addFolder('Flower ');
        const numPetalsController = f0.add(this.scene, 'numPetals', 1, 10, 1).name('Number of Petals');
        const radiusPetalsController = f0.add(this.scene, 'radiusPetals', 0.1, 1).name('Outer radius Flower');
        const radiusCenterController = f0.add(this.scene, 'radiusCenter', 0.1, 1).name('Radius Receplacle');
        const radiusStemController = f0.add(this.scene, 'radiusStem', 0.01, 1).name('Radius Stem');
        const heightStemController = f0.add(this.scene, 'heightStem', 0.5, 8).name('Height Stem');
        //this.gui.add(this.scene, 'centerView').name("Center View");
        var f1 = this.gui.addFolder('Color Flower ');
        f1.addColor(this.scene.customMaterialValues,'Diffuse').onChange(this.scene.updateCustomMaterial.bind(this.scene));

        //Slider element in GUI
        //this.gui.add(this.scene, 'scaleFactor', 0.1, 1).name('Scale Factor');

        // Set up callback functions to update flower parameters
        numPetalsController.onChange((value) => {
            this.scene.flower.updateFlowerParameters(
                value,
                this.scene.radiusPetals,
                this.scene.radiusCenter,
                this.scene.radiusStem,
                this.scene.heightStem
            );
        });

        radiusPetalsController.onChange((value) => {
            this.scene.flower.updateFlowerParameters(
                this.scene.numPetals,
                value,
                this.scene.radiusCenter,
                this.scene.radiusStem,
                this.scene.heightStem
            );
        });

        radiusCenterController.onChange((value) => {
            this.scene.flower.updateFlowerParameters(
                this.scene.numPetals,
                this.scene.radiusPetals,
                value,
                this.scene.radiusStem,
                this.scene.heightStem
            );
        });

        radiusStemController.onChange((value) => {
            this.scene.flower.updateFlowerParameters(
                this.scene.numPetals,
                this.scene.radiusPetals,
                this.scene.radiusCenter,
                value,
                this.scene.heightStem
            );
        });

        heightStemController.onChange((value) => {
            this.scene.flower.updateFlowerParameters(
                this.scene.numPetals,
                this.scene.radiusPetals,
                this.scene.radiusCenter,
                this.scene.radiusStem,
                value
            );
        });

        return true;
    }
}