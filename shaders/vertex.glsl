varying vec2 vUv1;
varying vec3 vPosition;
varying vec3 vPos;

varying vec2 vUv;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
attribute float aDirection;
attribute float aPress;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;

attribute float rands;
varying float vRand;
float PI = 3.141592653589793238;

uniform float move;
uniform float time;
attribute float size;
uniform vec2 mouse;
uniform float mousePressed;
uniform float transition;

void main() {
//   vUv = uv;
//   vec3 pos = position;

//   // NOT STABLE
//   pos.x += sin(move * aSpeed) * 3.;
//   pos.y += sin(move * aSpeed) * 3.;
//   pos.z = mod(position.z + move * 20. * aSpeed + aOffset, 2000.) - 1000.;

// // STABLE
//   vec3 stable = position;
//   float dist = distance(stable.xy, mouse);
//   float area = 1. - smoothstep(0., 300., dist);

//   stable.x += 50. * sin(0.1 * time * aPress) * aDirection * area * mousePressed ;
//   stable.y += 50. * sin(0.1 * time * aPress) * aDirection * area * mousePressed;
//   stable.z += 200. * cos(0.1 * time * aPress) * aDirection * area * mousePressed;

//   pos = mix(pos, stable, transition);

//   vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
//   // for particles we need it
//   gl_PointSize = 2500. * (1. / -mvPosition.z);
//   gl_Position = projectionMatrix * mvPosition;

//   vCoordinates = aCoordinates.xy;
//   vPos = pos;
}