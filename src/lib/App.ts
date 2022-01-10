import { Color, GemsPageBuilder } from '@/packages';

export default class AppPage extends GemsPageBuilder {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  public render(delta: number) {
    this.rect([0, 0, this.width, this.height], { color: Color.black }).text(
      `${~~(1000 / delta)}fps`,
      [this.width, 16],
      {
        fontSize: 16,
        color: Color.white,
        textAlign: 'right',
      },
    );
  }
}
