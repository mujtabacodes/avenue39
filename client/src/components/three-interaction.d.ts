// three-interaction.d.ts
declare module 'three.interaction' {
    import * as THREE from 'three';
  
    // Declare any specific classes or methods as needed
    export class Interaction {
      constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera);
    }
  }
  