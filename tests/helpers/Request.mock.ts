/* eslint-disable @typescript-eslint/no-explicit-any */

export class MockRequest {
  body: any;

  constructor(body: any = {}) {
    this.body = body;
  }
}
