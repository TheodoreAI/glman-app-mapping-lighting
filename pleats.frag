#version 330 compatibility

// you can set these 4 uniform variables dynamically or hardwire them:

uniform float	uKa, uKd, uKs;	// coefficients of each type of lighting
uniform float	uShininess;	// specular exponent


// interpolated from the vertex shader:
in  vec2  vST;                  // texture coords
in  vec3  vN;                   // normal vector
in  vec3  vL;                   // vector from point to light
in  vec3  vE;                   // vector from point to eye
in  vec3  vMC;			// model coordinates


// for Mac users:
//	Leave out the #version line, or use 120
//	Change the "in" to "varying"

vec3 uColor = vec3(1.0, 0.5, 0.0);
vec3 uSpecularColor = vec3(1.0, 1.0, 1.0);

void main( ){

	// now use myColor in the per-fragment lighting equations:
        vec3 Normal    = normalize(vN);
        vec3 Light     = normalize(vL);
        vec3 Eye       = normalize(vE);

        vec3 ambient = uKa * uColor;

        float dd = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
        vec3 diffuse = uKd * dd * uColor;

        float s = 0.;
        if( dd > 0. )              // only do specular if the light can see the point
        {
                vec3 ref = normalize(  reflect( -Light, Normal )  );
                float cosphi = dot( Eye, ref );
                if( cosphi > 0. )
                        s = pow( max( cosphi, 0. ), uShininess );
        }
        vec3 specular = uKs * s * uSpecularColor;
        gl_FragColor = vec4(ambient + diffuse + specular, 1.);
}