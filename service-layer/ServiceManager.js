export class ServiceManager {
  static #instance;

  constructor() {
    if (ServiceManager.#instance) return ServiceManager.#instance;

    this.__localManager = new LocalManager();
    this.__remoteManager = new RemoteManager();

    console.log("created a new service manager: ", this);

    ServiceManager.#instance = this;
  }

  mutate(request) {
    const { data, remoteService, localService } = request;

    if (remoteService) {
      console.log(this.__remoteManager.mutate(data, remoteService));
    }
    if (localService) {
      console.log(this.__localManager.mutate(data, localService));
    }
  }

  query(request) {
    const { remoteService, localService } = request;

    if (remoteService) this.__remoteManager.query(remoteService);
    if (localService) this.__localManager.query(localService);
  }
}

class RemoteManager {
  async mutate(data, service) {
    try {
      const res = await service(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async query(service) {
    service();
  }
}
class LocalManager {
  async mutate(data, service) {
    try {
      const res = await service(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async query(service) {
    service();
  }
}
