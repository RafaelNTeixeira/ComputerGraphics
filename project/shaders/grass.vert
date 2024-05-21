attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float strength;

varying vec3 vTransformedNormal;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);

    float movement = sin(position.y * 3.0 + timeFactor * strength);
    position.x += movement * 0.5;

    gl_Position = uPMatrix * uMVMatrix * position;
    vTransformedNormal = (uNMatrix * vec4(aVertexNormal, 1.0)).xyz;
}