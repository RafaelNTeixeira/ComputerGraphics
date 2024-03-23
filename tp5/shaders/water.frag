#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*0.005, timeFactor*0.005));
    vec4 filter = texture2D(uSampler2, vec2(0.0,0.1) + vTextureCoord);

    color.b -= color.b * filter.b * 0.2;
    color.r -= color.r * filter.b * 0.2;
    color.g -= color.g * filter.b * 0.2;
    
    gl_FragColor = color;
}