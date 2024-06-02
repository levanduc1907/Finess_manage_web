import { SERVICE_NAMES, ServiceLocator } from '../http';

import { UploadService } from './upload';

const serviceLocator = new ServiceLocator(SERVICE_NAMES);

const SERVICES = [UploadService];

SERVICES.forEach(Service => {
  const service = new Service();
  serviceLocator.registerService(service);
});

export const getService = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return serviceLocator.getService(name) as any;
};
