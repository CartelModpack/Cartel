export interface CartelAPIPing {
  motd: string;
  version: string;
  time: string;
}
export interface CartelAPILatest {
  cartel: string;
  game: string;
  loader: string;
  installer: string;
}
export type CartelAPIModList = {
  mod: string,
  version: string
}[];

export interface CartelAPIErrorResponse {
  status: number;
  content: never;
  error: string;
}
export interface CartelAPISuccessResponse<T> {
  status: 200;
  content: T;
  error: never;
}
export type CartelAPIResponse<T> = CartelAPISuccessResponse<T> | CartelAPIErrorResponse;
export default CartelAPIResponse;
