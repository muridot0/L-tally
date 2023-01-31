import app from '../../src/app';

describe('\'tally\' service', () => {
  it('registered the service', () => {
    const service = app.service('tally');
    expect(service).toBeTruthy();
  });
});
