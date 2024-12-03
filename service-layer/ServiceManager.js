export class ServiceManager {
  static #instance;

  constructor() {
    if (ServiceManager.#instance) return ServiceManager.#instance;

    this.__localManager = new LocalManager();
    this.__remoteManager = new RemoteManager();

    console.log("created a new service manager: ", this);

    ServiceManager.#instance = this;
  }

  async mutate(request) {
    const { data, remoteService, localService } = request;

    let remoteRes, localRes;

    if (remoteService) {
      remoteRes = await this.__remoteManager.mutate(data, remoteService);
    }
    if (localService) {
      localRes = await this.__localManager.mutate(data, localService);
    }

    if (remoteService && localService) {
      return { remote: remoteRes, local: localRes };
    }

    return remoteRes || localRes; // return only the exisiting one
  }

  async query(request) {
    const { remoteService, localService } = request;

    let remoteRes, localRes;

    if (remoteService) {
      remoteRes = await this.__remoteManager.query(remoteService);
    }
    if (localService) {
      localRes = await this.__localManager.query(localService);
    }

    // We need to decide who wins between the local and remote response of the queried data.
    // 1. Merge data based on timestamps
    // 2. If one fails, the other wins

    if (remoteService && localService) {
      // Merge goes here
    }
  }
}

class RemoteManager {
  async mutate(data, service) {
    return await service(data);
  }

  async query(service) {
    return await service();
  }
}
class LocalManager {
  async mutate(data, service) {
    return await service(data);
  }

  async query(service) {
    return await service();
  }
}
