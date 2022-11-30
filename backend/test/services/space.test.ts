import app from '../../src/app';

describe('\'space\' service', () => {
  it('registered the service', () => {
    const service = app.service('space');
    expect(service).toBeTruthy();
  });
});
