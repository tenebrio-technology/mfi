/* eslint-disable @typescript-eslint/no-explicit-any */

export class MockResponse {
  body: string = '';

  send(data: any): void {
    this.body = JSON.stringify(data);
  }
}
