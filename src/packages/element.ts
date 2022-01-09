export class GemsPageBuilder {
  protected canvas: HTMLCanvasElement;
  protected pen: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pen = canvas.getContext('2d')!;
  }
  public render(delta: number) {
    console.log(delta);
  }
}

export class GemsCanvas extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    const template = document.createElement('template');
    const canvas = document.createElement('canvas');
    const style = document.createElement('style');

    this.setCanvasStyle(canvas, style);
    template.content.appendChild(style);
    template.content.appendChild(canvas);
    shadow.appendChild(template.content);
    GemsCanvas.getCanvasFn && GemsCanvas.getCanvasFn(canvas);
  }
  private fitCanvas(canvas: HTMLCanvasElement) {
    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
  }
  private setCanvasStyle(canvas: HTMLCanvasElement, style: HTMLStyleElement) {
    canvas.classList.add('gems-game-canvas');
    this.fitCanvas(canvas);
    globalThis.addEventListener('resize', this.fitCanvas.bind(this, canvas));
    style.setAttribute('type', 'text/css');
    style.setAttribute('scoped', 'scoped');

    style.textContent = `
    .gems-game-canvas {
      position:fixed;
      left:0;
      top:0;
      width:100vw;
      height:100vh;
      overflow:hidden;
    }
    `;
  }
  private static getCanvasFn?(canvas: HTMLCanvasElement): void;
  public static setGetCanvasFn(fn: (canvas: HTMLCanvasElement) => void) {
    this.getCanvasFn = fn;
  }
}
