export enum LoadersActionTypes {
  SHOW_LOADER = 'SHOW_LOADER',
  HIDE_LOADER = 'HIDE_LOADER',
}

export enum LoaderName {
  GetPlayers = 'GetPlayers',
}

export type LoadersState = { [name in LoaderName]?: boolean };
