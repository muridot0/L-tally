import app from '../../src/app';

describe('\'avatar\' service', () => {
  it('registered the service', () => {
    const service = app.service('avatar');
    expect(service).toBeTruthy();
  });
});
