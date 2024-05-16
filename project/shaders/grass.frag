#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform vec4 grassColor;

void main() {
    gl_FragColor = grassColor;
}
