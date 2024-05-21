uniform float timeFactor; 
uniform float strength;     
uniform float angle;        
uniform mat4 uPMatrix;   
uniform mat4 uMVMatrix;    
uniform mat4 uNMatrix;      

attribute vec3 aVertexPosition;  
attribute vec3 aVertexNormal;   

varying vec3 vTransformedNormal;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    
    float movement1 = sin(position.y * 2.0 + timeFactor * strength);
    float movement2 = sin(position.y * 3.0 + timeFactor * strength * 0.7);
    float movement3 = sin(position.y * 5.0 + timeFactor * strength * 0.5);
    
    float movement = (movement1 + movement2 + movement3) / 3.0;
    
    float displacementX = movement * 0.3 * cos(angle);
    float displacementZ = movement * 0.3 * sin(angle);
    
    position.x += displacementX;
    position.z += displacementZ;
    
    gl_Position = uPMatrix * uMVMatrix * position;
    vTransformedNormal = (uNMatrix * vec4(aVertexNormal, 1.0)).xyz;
}
