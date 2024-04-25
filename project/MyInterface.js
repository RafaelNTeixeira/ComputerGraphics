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
            this.gui.add(this.scene, 'displayNormals').name("Display Normals");
            this.gui.add(this.scene, 'displayPanorama').name("Display Panorama");
            this.gui.add(this.scene, 'infiniteView').name('Infinite View');
            this.gui.add(this.scene, 'displayFlower').name("Display Flower");
            this.gui.add(this.scene, 'displayGarden').name("Display Garden");
            var f0 = this.gui.addFolder('Flower');
            const numPetalsController = f0.add(this.scene, 'numPetals', 5, 10, 1).name('Number of Petals');
            const radiusPetalsController = f0.add(this.scene, 'radiusPetals', 0.1, 1).name('Outer Radius Flower');
            const radiusCenterController = f0.add(this.scene, 'radiusCenter', 0.5, 1).name('Radius Receplacle');
            const radiusStemController = f0.add(this.scene, 'radiusStem', 0.05, 0.15).name('Radius Stem');
            const heightStemController = f0.add(this.scene, 'heightStem', 2.5, 8).name('Height Stem');
            //this.gui.add(this.scene, 'centerView').name("Center View");
            var f1 = this.gui.addFolder('Color Flower');
            const flowerPetalsColorController = f1.addColor(this.scene.customMaterialValues,'Color Petals').onChange(this.scene.updateCustomMaterial.bind(this.scene));
            const flowerCenterColorController = f1.addColor(this.scene.customMaterialValues,'Color Center').onChange(this.scene.updateCustomMaterial.bind(this.scene));
            const flowerStemColorController = f1.addColor(this.scene.customMaterialValues,'Color Stem').onChange(this.scene.updateCustomMaterial.bind(this.scene));
            const flowerLeavesColorController = f1.addColor(this.scene.customMaterialValues,'Color Leaves').onChange(this.scene.updateCustomMaterial.bind(this.scene));
            var f2 = this.gui.addFolder('Garden');
            const rowsGardenController = f2.add(this.scene, 'gardenRows', 5, 10, 1).name('Garden Rows');
            const colsGardenController = f2.add(this.scene, 'gardenCols', 5, 10, 1).name('Garden Cols');
            //Slider element in GUI
            //this.gui.add(this.scene, 'scaleFactor', 0.1, 1).name('Scale Factor');
            // Set up callback functions to update flower parameters
            const flowerParameterChangeHandler = () => {
                this.scene.flower.updateFlowerParameters(
                    this.scene.numPetals,
                    this.scene.radiusPetals,
                    this.scene.radiusCenter,
                    this.scene.radiusStem,
                    this.scene.heightStem,
                    this.scene.customMaterialValues['Color Petals'],
                    this.scene.customMaterialValues['Color Center'],
                    this.scene.customMaterialValues['Color Stem'],
                    this.scene.customMaterialValues['Color Leaves']
                );
            };
            numPetalsController.onChange(flowerParameterChangeHandler);
            radiusPetalsController.onChange(flowerParameterChangeHandler);
            radiusCenterController.onChange(flowerParameterChangeHandler);
            radiusStemController.onChange(flowerParameterChangeHandler);
            heightStemController.onChange(flowerParameterChangeHandler);
            

            flowerPetalsColorController.onChange((value) => {
                this.scene.flower.updateFlowerParameters(
                    this.scene.numPetals,
                    this.scene.radiusPetals,
                    this.scene.radiusCenter,
                    this.scene.radiusStem,
                    this.scene.heightStem,
                    value,
                    this.scene.customMaterialValues['Color Center'],
                    this.scene.customMaterialValues['Color Stem'],
                    this.scene.customMaterialValues['Color Leaves']
                );
            });
            flowerCenterColorController.onChange((value) => {
                this.scene.flower.updateFlowerParameters(
                    this.scene.numPetals,
                    this.scene.radiusPetals,
                    this.scene.radiusCenter,
                    this.scene.radiusStem,
                    this.scene.heightStem,
                    this.scene.customMaterialValues['Color Petals'],
                    value,
                    this.scene.customMaterialValues['Color Stem'],
                    this.scene.customMaterialValues['Color Leaves']
                );
            });
            flowerStemColorController.onChange((value) => {
                this.scene.flower.updateFlowerParameters(
                    this.scene.numPetals,
                    this.scene.radiusPetals,
                    this.scene.radiusCenter,
                    this.scene.radiusStem,
                    this.scene.heightStem,
                    this.scene.customMaterialValues['Color Petals'],
                    this.scene.customMaterialValues['Color Center'],
                    value,
                    this.scene.customMaterialValues['Color Leaves']
                );
            });
            flowerLeavesColorController.onChange((value) => {
                this.scene.flower.updateFlowerParameters(
                    this.scene.numPetals,
                    this.scene.radiusPetals,
                    this.scene.radiusCenter,
                    this.scene.radiusStem,
                    this.scene.heightStem,
                    this.scene.customMaterialValues['Color Petals'],
                    this.scene.customMaterialValues['Color Center'],
                    this.scene.customMaterialValues['Color Stem'],
                    value
                );
            });

            
            const gardenSizeChangeHandler = () => {
                this.scene.garden.updateGardenSize(
                    this.scene.gardenRows,
                    this.scene.gardenCols
                );
            };
            rowsGardenController.onChange(gardenSizeChangeHandler);
            colsGardenController.onChange(gardenSizeChangeHandler);
            

            return true;
        }
    }