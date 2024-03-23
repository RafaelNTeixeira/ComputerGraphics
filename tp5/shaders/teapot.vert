attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec4 vertice;

void main() {
    // y e z mantêm-se, x altera-se
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + sin(timeFactor), aVertexPosition.y, aVertexPosition.z, 1.0);
    vertice = gl_Position;
}