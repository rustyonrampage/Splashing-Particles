uniform float time;
varying vec2 vUv;
varying vec2 vUv1;
varying vec3 vPosition;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

attribute float rands;
varying float vRand;
float PI = 3.141592653589793238;

attribute float size;

void main() {
    vUv = uv;
// //   vRand = floor(rands*5.);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
  // for particles we need it
    gl_PointSize = 50. * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}