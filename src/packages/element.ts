export const enum Color {
  black = '#000',
  white = '#fff',
}
export const enum FontFamily {
  Arial = 'Arial',
}
export const enum FontStyle {
  normal = 'normal',
  italic = 'italic',
  oblique = 'oblique',
}
export const enum FontWeight {
  normal = 'normal',
  bold = 'bold',
  bolder = 'bolder',
  lighter = 'lighter',
}
export const enum FontVariant {
  normal = 'normal',
  smallCaps = 'small-caps',
}
declare module Builder {
  namespace Text {
    type Position = [number, number];
    interface Style {
      color: Color | keyof typeof Color;
      fontFamily: FontFamily | keyof typeof FontFamily;
      textAlign: CanvasTextAlign;
      fontSize: number;
      fontStyle: FontStyle | keyof typeof FontStyle;
      fontWeight: FontWeight | keyof typeof FontWeight | number;
      fontVariant: FontVariant | keyof typeof FontVariant;
    }
    interface Otp {
      maxWith?: number;
    }
  }
  namespace Rect {
    type Position = [number, number, number, number];
    interface Style {
      color: Color;
    }
    interface Otp {
      style: Style;
    }
  }
}
export class GemsPageBuilder {
  protected canvas: HTMLCanvasElement;
  protected pen: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;
  protected x: number;
  protected y: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.pen = canvas.getContext('2d')!;
    this.x = 0;
    this.y = 0;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  public render(delta: number) {
    console.log(delta);
  }
  protected get cWidth() {
    return this.canvas.width;
  }
  protected get cHeight() {
    return this.canvas.height;
  }
  protected rect(position: Builder.Rect.Position, style: Builder.Rect.Style) {
    this.pen.fillStyle = style.color;
    this.pen.fillRect(...position);
    return this;
  }
  protected text(
    content: string,
    position: Builder.Text.Position,
    style?: Partial<Builder.Text.Style>,
    otp?: Builder.Text.Otp,
  ) {
    this.pen.fillStyle = style?.color || Color.black;
    this.pen.font = `${style?.fontSize ?? 16}px ${
      style?.fontFamily ?? FontFamily.Arial
    }`;
    this.pen.textAlign = style?.textAlign ?? 'left';
    this.pen.fillText(content, ...position, otp?.maxWith);
    return this;
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
