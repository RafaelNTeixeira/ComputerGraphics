import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPolen } from "./MyPolen.js";

export class MyFlower extends CGFobject {
    constructor(scene, numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem, colorLeaves, hasPolen) {
		super(scene);
        this.numPetals = numPetals;
        this.radiusPetals = radiusPetals;

        this.receptacle = new MyReceptacle(this.scene, radiusCenter);
        this.cylinder = new MyCylinder(this.scene, radiusStem, heightStem, colorLeaves);
        this.petal = new MyPetal(this.scene, (Math.random() * 3.01));
        this.polen = new MyPolen(this.scene, 0.2, 50, 50);
        this.polenTexture = new CGFtexture(this.scene, 'images/bee/polen.png');
        this.colorPetals = colorPetals;
        this.colorCenter = colorCenter;
        this.colorStem = colorStem;
        this.colorLeaves = colorLeaves;
        this.xi = 0;
        this.xf = 0;
        this.zi = 0;
        this.zf = 0;
        this.beeHere = false;
        this.hasPolen = hasPolen;
        
        this.updateFlowerParameters(numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem, colorLeaves);
	}

    updateFlowerParameters(numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem, colorLeaves) {
        this.receptacle.setRadius(radiusCenter);
        this.cylinder.setRadiusAndHeight(radiusStem, heightStem);
        this.cylinder.setLeavesColor(colorLeaves);
        this.numPetals = numPetals;
        this.radiusPetals = radiusPetals;
        this.radiusCenter = radiusCenter;
        this.radiusStem = radiusStem;
        this.heightStem = heightStem;
        this.colorPetals = colorPetals;
        this.colorCenter = colorCenter;
        this.colorStem = colorStem;
        this.colorLeaves = colorLeaves;
    }

    translateFlower(heightStem) {
        if (heightStem == 8){
            return 0;
        } else if (heightStem == 6) {
            return 2 * Math.cos(Math.PI);
        }
        else if (heightStem == 4) {
            return 4 * Math.cos(Math.PI);
        }
        return 0;
    }

    printSquare(){
        console.log("XI: " + this.xi);
        console.log("XF: " + this.xf);
        console.log("ZI: " + this.zi);
        console.log("ZF: " + this.zf);
    }

    display() {
        this.scene.centerMaterial.setDiffuse(...this.scene.hexToRgbA(this.colorCenter));
        this.scene.centerMaterial.apply();
        this.receptacle.display();

        // Stem
        this.scene.stemMaterial.setDiffuse(...this.scene.hexToRgbA(this.colorStem));
        this.scene.stemMaterial.apply();
        var rad = -90 * Math.PI / 180;
        var rotStem = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        //let trans = this.translateFlower(this.heightStem);
        this.scene.pushMatrix();
        this.scene.multMatrix(rotStem);
        this.cylinder.display();
        this.scene.popMatrix();
        
        // Petals
        this.scene.pushMatrix();
        this.scene.petalsMaterial.setDiffuse(...this.scene.hexToRgbA(this.colorPetals));
        this.scene.petalsMaterial.apply();
        this.scene.popMatrix();
        const angleIncrement = (2 * Math.PI) / (this.numPetals);

        for (let i = 0; i < this.numPetals; i++) {
            // Calculate the angle for this petal
            const angle = i * angleIncrement;
    
            // Calculate the position of the petal relative to the receptacle
            const offsetX = Math.cos(angle) * this.radiusPetals;
            const offsetY = Math.sin(angle) * this.radiusPetals;
    
            // Calculate the rotation angle for the petal
            const rotationAngle = angle + 45 + Math.PI / this.numPetals;
    
            this.scene.pushMatrix();
            this.scene.translate(offsetX, offsetY, -0.001);
            this.scene.rotate(rotationAngle, 0, 0, 1);

            const scaleFactor = 0.4;
            this.scene.scale(scaleFactor, scaleFactor, scaleFactor);

            this.petal.display();
            this.scene.popMatrix();
        }

        if (this.beeHere) this.hasPolen = false;

        if (this.hasPolen) {
            let polenAppearance = new CGFappearance(this.scene);
            polenAppearance.setTexture(this.polenTexture);
            polenAppearance.apply();

            this.scene.pushMatrix();
            this.scene.translate(-0.3, 0.3, 0);
            this.polen.display();
            this.scene.popMatrix();

            let appearance = new CGFappearance(this.scene);
            appearance.apply();
        }

        
    }

}