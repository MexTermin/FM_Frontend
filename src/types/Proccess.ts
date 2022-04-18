export interface ProcessEnv {
  [key: string]: string | undefined;
}

export interface IAlert {
  success: string;
  danger: string;
  warning: string;
}
