import wretch, { Wretcher } from 'wretch';

interface ApiEnvironment {
  BASE_SERVER_URL: string;
  LOCALE: string;
  PLATFORM: string;
}

export interface ApiParams {
  environment: ApiEnvironment;
}

export abstract class BaseApi {
  protected environment: ApiEnvironment;
  protected unauthenticatedClient: Wretcher;

  constructor({ environment }: ApiParams) {
    this.environment = environment;
    this.unauthenticatedClient = wretch(this.environment.BASE_SERVER_URL).headers({
      'x-platform': this.environment.PLATFORM,
      'x-locale': this.environment.LOCALE,
    });
  }
}
