import * as THREE from 'three';
import { App } from './App';
import { HyperspeedOptions, LightsStickProps } from './hyperspeedTypes';

export class LightsSticks {
  app: App;
  options: HyperspeedOptions;
  geometry!: THREE.BufferGeometry;
  material!: THREE.ShaderMaterial;
  mesh!: THREE.Mesh;
  props: LightsStickProps;

  constructor(app: App, options: HyperspeedOptions) {
    this.app = app;
    this.options = options;
    this.props = {
      count: 15,
      roadWidth: options.roadWidth,
      islandWidth: options.islandWidth,
      color: 0xffffff,
    };
  }

  init() {
    const { count, roadWidth, islandWidth } = this.props;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(count * 3 * 2); // 3 vertices per point, 2 points per stick
    const randoms = new Float32Array(count * 2);
    
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const width = Math.max(0.1, Math.random()) * 0.1;
      
      // First vertex
      positions[i * 6 + 0] = -width; // x
      positions[i * 6 + 1] = Math.random() * 0.5; // y
      positions[i * 6 + 2] = -Math.random() * roadWidth * 2 - roadWidth - islandWidth; // z
      
      // Second vertex
      positions[i * 6 + 3] = width; // x
      positions[i * 6 + 4] = Math.random() * 0.5; // y
      positions[i * 6 + 5] = -Math.random() * roadWidth * 2 - roadWidth - islandWidth; // z
      
      // Random values for animation
      randoms[i * 2 + 0] = r;
      randoms[i * 2 + 1] = r;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1));
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(this.props.color) },
        fogColor: this.app.fogUniforms.fogColor,
        fogNear: this.app.fogUniforms.fogNear,
        fogFar: this.app.fogUniforms.fogFar,
      },
      vertexShader: `
        uniform float time;
        attribute float random;
        varying float vRandom;
        
        #include <fog_pars_vertex>
        
        void main() {
          vRandom = random;
          float t = time * 0.6;
          float moveZ = mod(t + vRandom * 100.0, 100.0) - 50.0;
          
          vec3 pos = position;
          pos.z += moveZ;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          
          #include <fog_vertex>
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vRandom;
        
        #include <fog_pars_fragment>
        
        void main() {
          vec3 finalColor = color * vRandom;
          gl_FragColor = vec4(finalColor, 1.0);
          
          #include <fog_fragment>
        }
      `,
      fog: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    
    this.geometry = geometry;
    this.material = material;
    this.mesh = mesh;
    
    this.app.scene.add(mesh);
  }
  
  update(time: number) {
    this.material.uniforms.time.value = time;
  }
  
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.app.scene.remove(this.mesh);
  }
} 