import { Vector3 } from '@minecraft/server';

export function getPositionsInBox(pos1: Vector3, pos2: Vector3): Vector3[] {
  const minX = Math.floor(Math.min(pos1.x, pos2.x));
  const minY = Math.floor(Math.min(pos1.y, pos2.y));
  const minZ = Math.floor(Math.min(pos1.z, pos2.z));

  const maxX = Math.floor(Math.max(pos1.x, pos2.x));
  const maxY = Math.floor(Math.max(pos1.y, pos2.y));
  const maxZ = Math.floor(Math.max(pos1.z, pos2.z));

  const result: Vector3[] = [];

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        result.push({ x, y, z });
      }
    }
  }

  return result;
}
