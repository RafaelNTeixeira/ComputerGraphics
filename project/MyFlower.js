import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyStem } from "./MyStem.js";


export class MyFlower extends CGFobject {
    constructor(scene, numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem) {
		super(scene);
        this.numPetals = numPetals;
        this.radiusPetals = radiusPetals;
		this.petal = new MyPetal(this.scene, (Math.random() * 3.01));
        this.receptacle = new MyReceptacle(this.scene, radiusCenter);
        this.stem = new MyStem(this.scene, radiusStem, heightStem);
        this.colorPetals = colorPetals;
        this.colorCenter = colorCenter;
        this.colorStem = colorStem;
        this.updateFlowerParameters(numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem);

	}

    updateFlowerParameters(numPetals, radiusPetals, radiusCenter, radiusStem, heightStem, colorPetals, colorCenter, colorStem) {
        this.receptacle.setRadius(radiusCenter);
        this.stem.setRadiusAndHeight(radiusStem, heightStem);
        this.numPetals = numPetals;
        this.radiusPetals = radiusPetals;
        this.radiusCenter = radiusCenter;
        this.radiusStem = radiusStem;
        this.heightStem = heightStem;
        this.colorPetals = colorPetals;
        this.colorCenter = colorCenter;
        this.colorStem = colorStem;
    }

    display() {
        this.scene.setDiffuse(...this.scene.hexToRgbA(this.colorCenter));
        this.receptacle.display();

        // Stem
        this.scene.setDiffuse(...this.scene.hexToRgbA(this.colorStem));
        var rad = -90 * Math.PI / 180;
        var rotStem = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0
        ]

        var transStem = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -this.radiusStem, 0.0, 1.0,
        ]

        this.scene.pushMatrix();
        this.scene.multMatrix(rotStem);
        this.scene.multMatrix(transStem);
        this.stem.display();
        this.scene.popMatrix();     
        
        // Petals
        this.scene.setDiffuse(...this.scene.hexToRgbA(this.colorPetals));
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
    }

}