import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.initGarden();
    }

    updateGardenSize(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.initGarden();
    }

    initGarden() {
        this.flowers = [];
    
        const generateRandomFlower = () => {
            const randNumPetals = Math.floor(Math.random() * 6) + 5;
            const randRadiusPetals = Math.random() * 1 + 0.1;
            const randRadiusCenter = Math.random() * 0.13 + 0.5;
            const randRadiusStem = Math.random() * 0.1 + 0.05;
            const values = [4, 6, 8];
            const randHeightStem = values[Math.floor(Math.random() * values.length)];
    
            const generateRandomColor = () => {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            };
    
            return new MyFlower(
                this.scene,
                randNumPetals,
                randRadiusPetals,
                randRadiusCenter,
                randRadiusStem,
                randHeightStem,
                generateRandomColor(),
                generateRandomColor(),
                generateRandomColor(),
                generateRandomColor()
            );
        };
    
        for (let i = 0; i < this.numRows; i++) {
            const row = [];
            for (let j = 0; j < this.numCols; j++) {
                const flower = generateRandomFlower();
                row.push(flower);
            }
            this.flowers.push(row);
        }
    }
    
    display() {
        const distanceBetweenFlowers = 7.0;
        const startX = -this.numCols / 2;
        const startZ = -this.numRows / 2;
    
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flower = this.flowers[i][j];
                const x = startX + j * distanceBetweenFlowers;
                const z = startZ + i * distanceBetweenFlowers;
                this.scene.pushMatrix();
                this.scene.translate(x, flower.translateFlower(flower.heightStem), z);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
    
}