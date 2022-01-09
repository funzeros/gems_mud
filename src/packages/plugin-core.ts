import type { GemsEngine } from '.';

export abstract class GemsPlugin {
  abstract install(engine: GemsEngine): void;
}
