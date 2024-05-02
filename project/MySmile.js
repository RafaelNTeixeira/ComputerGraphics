import { CGFobject } from '../lib/CGF.js';

export class MySmile extends CGFobject {
    constructor(scene, radius, segments) {
        super(scene);
        this.radius = radius;
        this.segments = segments;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Define the vertices of a simple curve manually
        // You can adjust these points to create different curves
        const curvePoints = [
            [0, 0, 0],       // Start point
            [-0.5, 0.2, 0],  // Control point 1
            [-0.3, 0.4, 0],  // Control point 2
            [0, 0.6, 0],     // End point
        ];

        // Interpolate points on the curve
        for (let i = 0; i <= this.segments; i++) {
            const t = i / this.segments;
            const point = this.bezierCurve(curvePoints, t);

            this.vertices.push(...point);
            this.normals.push(0, 0, 1); // Normal pointing towards positive z-axis
        }

        // Create indices for drawing the curve
        for (let i = 0; i < this.segments; i++) {
            this.indices.push(i, i + 1);
        }

        this.primitiveType = this.scene.gl.LINES;
        this.initGLBuffers();
    }

    // Function to compute a point on a Bezier curve
    bezierCurve(controlPoints, t) {
        const n = controlPoints.length - 1;
        let point = [0, 0, 0];

        for (let i = 0; i <= n; i++) {
            const blend = this.binomialCoefficient(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
            point[0] += blend * controlPoints[i][0];
            point[1] += blend * controlPoints[i][1];
            point[2] += blend * controlPoints[i][2];
        }

        return point;
    }

    // Function to compute binomial coefficient
    binomialCoefficient(n, k) {
        if (k === 0 || k === n) return 1;

        let result = 1;
        for (let i = 1; i <= k; i++) {
            result *= (n - i + 1) / i;
        }

        return result;
    }
}