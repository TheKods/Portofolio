import * as THREE from 'three';

export interface HyperspeedOptions {
  // Basic settings
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  roadWidth: number;
  islandWidth: number;
  length: number;
  
  // Speed settings
  movingAwaySpeed: number;
  movingCloserSpeed: number;
  
  // Visual settings
  carLightsFade: number;
  lanesPerRoad: number;
  
  // Colors
  colors: {
    background: number;
    leftCars: number[];
    rightCars: number[];
    road: number;
    roadLine: number;
    island: number;
  };
  
  // Optional callbacks
  onSpeedUp?: (event: MouseEvent) => void;
  onSlowDown?: (event: MouseEvent) => void;
  
  // Optional distortion effect
  distortion?: {
    getJS: (strength: number, time: number) => { x: number; y: number };
  };
}

export interface RoadProps {
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
}

export interface CarLightsProps {
  colors: number[];
  speed: number;
  fade: THREE.Vector2;
}

export interface LightsStickProps {
  count: number;
  roadWidth: number;
  islandWidth: number;
  color?: number;
} 