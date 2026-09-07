// ================================================================
//  OS_CORE.js — der eigentliche "Kernel": hält die gemeinsame Uhr
//  (Clock aus NC_time.js) und einen zentralen Zustand (state), auf
//  den Module lesend/schreibend zugreifen. Kein Mysterium, ein
//  simples Singleton-Objekt.
// ================================================================
import { Clock } from './NC_time.js';

export class OSCore {
  constructor() {
    this.clock = new Clock();
    this.state = {};
  }
  set(key, value) { this.state[key] = value; }
  get(key) { return this.state[key]; }
}

// eine geteilte Instanz für die ganze Seite
export const kernel = new OSCore();
