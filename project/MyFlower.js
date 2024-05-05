import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPolen } from "./MyPolen.js";

export class MyFlower extends CGFobject {
    constructor(scene, numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem, colorLeaves) {
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
            const offsetX = Math.cos(angle) * this.radiusPetals; // Adjust the radius as needed
            const offsetY = Math.sin(angle) * this.radiusPetals; // Adjust the radius as needed
    
            // Calculate the rotation angle for the petal
            const rotationAngle = angle + 45 + Math.PI / this.numPetals; // Adjust the rotation as needed
    
            // Apply transformations to position and rotate the petal
        
            this.scene.pushMatrix();
            this.scene.translate(offsetX, offsetY, -0.001); // Translate to position
            this.scene.rotate(rotationAngle, 0, 0, 1); // Rotate around the z-axis

            // Scale
            const scaleFactor = 0.4;
            this.scene.scale(scaleFactor, scaleFactor, scaleFactor);

            // Display the petal
            this.petal.display();
            this.scene.popMatrix();
        }

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