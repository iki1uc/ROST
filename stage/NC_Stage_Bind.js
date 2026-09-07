// ================================================================
//  NC_space.js (Gruppe 1: NC-Suite — Raumlogik)
//  Erzeugt ein achsenorientiertes Punktgitter (für das 9×9-Respo-
//  Mesh) und liefert lesbare Achsen-Koordinaten. Reale Geometrie,
//  keine erfundene "Physik".
// ================================================================
import { Vec3 } from './vec.js';

export function gridPoints(cols, rows, spacing) {
  const pts = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c - (cols - 1) / 2) * spacing;
      const z = (r - (rows - 1) / 2) * spacing;
      pts.push({ row: r, col: c, pos: new Vec3(x, 0, z) });
    }
  }
  return pts;
}

export function axisLabel(v) {
  return `X:${v.x.toFixed(1)} Y:${v.y.toFixed(1)} Z:${v.z.toFixed(1)}`;
}
