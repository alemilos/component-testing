export type Target = "remote" | "local" | "both";

export type Params = {};

type LocalService = (...args: any[]) => any;
type RemoteService = (...args: any[]) => any;

export type ServiceRequest = {
  data: Record<string, unknown>;
  remoteService: RemoteService;
  localService: LocalService;
  params: Params;
};
