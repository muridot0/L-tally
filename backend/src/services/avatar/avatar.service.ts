// Initializes the `avatar` service on path `/avatar`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Avatar } from './avatar.class';
import createModel from '../../models/avatar.model';
import hooks from './avatar.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'avatar': Avatar & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/avatar', new Avatar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('avatar');

  service.hooks(hooks);
}
