attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float strength;
uniform float angle;

varying vec3 vTransformedNormal;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);

    float movement = sin(position.y * 3.0 + timeFactor * strength);
    float displacementX = movement * 0.5 * cos(angle);
    float displacementZ = movement * 0.5 * sin(angle);
    
    position.x += displacementX;
    position.z += displacementZ;

    gl_Position = uPMatrix * uMVMatrix * position;
    vTransformedNormal = (uNMatrix * vec4(aVertexNormal, 1.0)).xyz;
}
