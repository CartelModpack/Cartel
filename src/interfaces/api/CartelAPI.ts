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

export interface CartelAPIResponse<T> {
  status: number;
  content?: T;
  error?: string;
}
export default CartelAPIResponse;
