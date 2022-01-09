import { GemsPageBuilder } from '@/packages';

export default class AppPage extends GemsPageBuilder {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  public render(delta: number) {
    this.pen.fillStyle = '#000';
    this.pen.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.pen.fillStyle = '#fff';
    this.pen.font = 'bold 30px Arial';
    this.pen.textAlign = 'left';
    this.pen.fillText(`${~~(1000 / delta)}FPS`, 5, 30);
  }
}
