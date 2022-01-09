import { Utils } from '@/utils';
import type { GemsPageBuilder } from '.';

export default class GemsRuntime extends Utils {
  private instanceStack: GemsPageBuilder[] = [];
  private then = Date.now();
  private raf = 0;
  constructor() {
    super();
  }

  private animateLoop() {
    const now = Date.now();
    const delta = now - this.then;
    this.forOf(this.instanceStack, (instance) => {
      instance.render(delta);
    });
    this.then = now;
    this.raf = requestAnimationFrame(this.animateLoop.bind(this));
  }
  protected pushInstance(ins: GemsPageBuilder) {
    this.instanceStack.push(ins);
  }
  protected clearInstance() {
    this.instanceStack.length = 0;
  }
  protected startAnimate() {
    this.animateLoop();
  }
  protected stopAnimate() {
    cancelAnimationFrame(this.raf);
  }
}
