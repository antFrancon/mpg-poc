export enum ErrorsActionTypes {
  SHOW_ERROR = 'SHOW_ERROR',
  HIDE_ERROR = 'HIDE_ERROR',
}

export enum ErrorName {
  InternalServerError = 'InternalServerError',
}

export const networkRequestFailedErrorMessage = 'Network request failed';
export const notLoggedInErrorMessage = 'NOT_LOGGED_IN';

export type ErrorsState = { [name in ErrorName]?: boolean };
