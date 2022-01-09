import type { GemsEngine } from '.';
import { GemsPlugin } from '.';
declare module Router {
  interface RouteItem {
    name: Symbol;
    component: GFn;
  }
}

export default class GemsRouter implements GemsPlugin {
  private routePool: Map<Symbol, Router.RouteItem> = new Map();
  private currentRoute: Router.RouteItem;
  constructor(routes: Router.RouteItem[]) {
    if (!routes.length) throw new Error('路由不能为空');
    routes.forEach((m) => {
      this.routePool.set(m.name, m);
    });
    this.currentRoute = routes[0];
  }
  public install(engine: GemsEngine): void {
    engine.setRouter(this);
  }
  public getCurrentRouter() {
    return this.currentRoute;
  }
}
