// ================================================================
//  NC_kraft.js (Gruppe 1: NC-Suite — Kraftlogik)
//  Einfache, aber echte Kraft-Formeln: Federkraft (Annäherung an
//  ein Ziel), Dämpfung, Begrenzung. Genau das, was die Slots im
//  Respo-Mesh und die Screen-Bewegungen weich statt sprunghaft
//  macht — kein Fantasie-Physik-Begriff, sondern die tatsächlich
//  verwendete Mathematik.
// ================================================================

export function springForce(current, target, stiffness = 0.05) {
  return (target - current) * stiffness;
}

export function damp(velocity, damping = 0.8) {
  return velocity * damping;
}

export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
