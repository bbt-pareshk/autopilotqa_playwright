import { APIRequestContext } from '@playwright/test';

export class ApiService {
  constructor(private request: APIRequestContext) {}

  async get(url: string) {
    return await this.request.get(url);
  }
}
