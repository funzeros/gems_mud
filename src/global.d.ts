declare interface RunTimeProcess {
  env: {
    G_BASE_URL: string;
    G_IS_DEV: boolean;
  };
}
declare const process: RunTimeProcess;
