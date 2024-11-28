import { ServiceRequest } from "./ServiceRequest";

class ServiceManager {
  static #instance: ServiceManager;

  __remoteManager: RemoteManager;
  __localManager: LocalManager;

  constructor() {
    if (ServiceManager.#instance) return ServiceManager.#instance;

    this.__remoteManager = new RemoteManager();
    this.__localManager = new LocalManager();

    ServiceManager.#instance = this;
  }

  mutate(request: ServiceRequest) {
    const { data, remoteService, localService } = request;

    if (remoteService) this.__remoteManager.mutate(data, remoteService);
    if (localService) this.__localManager.mutate(data, localService);
  }

  query(request: ServiceRequest) {
    const { remoteService, localService } = request;

    if (remoteService) this.__remoteManager.query(remoteService);
    if (localService) this.__localManager.query(localService);
  }
}

class RemoteManager {
  mutate(data: Record<string, unknown>, service: (...args: any[]) => any) {
    service(data);
  }

  query(service: (...args: any[]) => any) {
    service();
  }
}
class LocalManager {
  mutate(data: Record<string, unknown>, service: (...args: any[]) => any) {
    service(data);
  }

  query(service: (...args: any[]) => any) {
    service();
  }
}

const serviceManager = new ServiceManager();
export { serviceManager };
