attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float angle;
uniform float strength;
uniform float timeFactor;

void main() {

    vec3 offset = vec3(
        strength * sin(angle) * timeFactor * (aVertexPosition.y + 0.5), 
        0.0, 
        strength * cos(angle) * timeFactor * (aVertexPosition.y + 0.5)
    );
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

