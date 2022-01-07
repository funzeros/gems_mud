import type { GemsCanvas as GemsCanvasType } from '.';

export default class GemsEngine {
  constructor() {}
  private canvas?: HTMLCanvasElement;
  /**
   * @author Gems
   * @date 2022/01/07 21:37:24
   * @description 引擎初始化
   */
  public initialize(GemsCanvas: typeof GemsCanvasType) {
    GemsCanvas.setGetCanvasFn((canvas) => {
      this.canvas = canvas;
      this.canvasReady();
    });
    customElements.define('gems-canvas', GemsCanvas);
  }
  private canvasReady() {
    console.log(this.canvas);
  }
}
