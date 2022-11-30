// Initializes the `space` service on path `/space`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Space } from './space.class';
import createModel from '../../models/space.model';
import hooks from './space.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'space': Space & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/space', new Space(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('space');

  service.hooks(hooks);
}
