// Initializes the `tally` service on path `/tally`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Tally } from './tally.class';
import createModel from '../../models/tally.model';
import hooks from './tally.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tally': Tally & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tally', new Tally(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tally');

  service.hooks(hooks);
}
