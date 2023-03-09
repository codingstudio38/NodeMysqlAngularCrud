import { Base64decodePipe } from './base64decode.pipe';

describe('Base64decodePipe', () => {
  it('create an instance', () => {
    const pipe = new Base64decodePipe();
    expect(pipe).toBeTruthy();
  });
});
