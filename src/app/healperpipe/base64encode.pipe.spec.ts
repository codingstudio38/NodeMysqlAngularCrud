import { Base64encodePipe } from './base64encode.pipe';

describe('Base64encodePipe', () => {
  it('create an instance', () => {
    const pipe = new Base64encodePipe();
    expect(pipe).toBeTruthy();
  });
});
