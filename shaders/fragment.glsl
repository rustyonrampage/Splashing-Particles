uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
varying float vRand;
uniform vec3 palette[5];

uniform sampler2D t1;
uniform sampler2D t2;
uniform sampler2D mask;
varying vec3 vPos;

varying vec2 vCoordinates;

uniform float move;
void main() {
	vec4 maskTexture = texture2D(mask, gl_PointCoord);
	vec2 myUV = vec2(vCoordinates.x / 512., vCoordinates.y / 512.);

	vec4 tt1 = texture2D(t1, myUV);
	vec4 tt2 = texture2D(t2, myUV);

	vec4 final = mix(tt1, tt2, smoothstep(0., 1., fract(move)));

	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

	// float dist = length(gl_PointCoord.xy - vec2(0.5)); 

	// float disc = smoothstep(0.4,.45,dist);
	// if(disc>0.01) discard;
	// vec3 color = palette[int(vRand)];
	// vec3 color = vec3(1.);

	float alpha = 1. - clamp(0., 1., abs(vPos.z / 900.));
	gl_FragColor = final;
	gl_FragColor.a *= maskTexture.r * alpha;
	// gl_FragColor = vec4(alpha);

	// gl_FragColor = vec4(color,0.1);
}