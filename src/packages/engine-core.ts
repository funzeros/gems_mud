import type {
  GemsCanvas as GemsCanvasType,
  GemsPageBuilder,
  GemsPlugin,
  GemsRouter,
} from '.';
import { GemsRuntime } from '.';
export default class GemsEngine extends GemsRuntime {
  AppPage: typeof GemsPageBuilder;
  constructor(page: typeof GemsPageBuilder) {
    super();
    this.AppPage = page;
  }
  private _canvas?: HTMLCanvasElement;
  private _router?: GemsRouter;
  /**
   * @author Gems
   * @date 2022/01/07 21:37:24
   * @description 引擎初始化
   */
  public initialize(GemsCanvas: typeof GemsCanvasType) {
    GemsCanvas.setGetCanvasFn((canvas) => {
      this._canvas = canvas;
      this._canvasReady();
    });
    customElements.define('gems-canvas', GemsCanvas);
  }
  private _canvasReady() {
    this._pageInit(new this.AppPage(this._canvas!));
    if (this._router) {
      console.log(this._router);
    }
    this.startAnimate();
    this._touchEventInit();
  }
  private _pageInit(pageInstance: GemsPageBuilder) {
    this.pushInstance(pageInstance);
  }
  private _touchEventInit() {
    this._canvas?.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });
    this._canvas?.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
    this._canvas?.addEventListener('touchend', (e) => {
      e.preventDefault();
    });
    this._canvas?.addEventListener('touchcancel', (e) => {
      e.preventDefault();
    });
  }
  public use(plugin: GemsPlugin) {
    plugin.install(this);
    return this;
  }
  public setRouter(router: GemsRouter) {
    this._router = router;
  }
}
