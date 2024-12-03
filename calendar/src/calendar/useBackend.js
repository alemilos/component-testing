/**
 * useBackend provides an interface for CalendarProvider, to connect with the backend api.
 * @returns
 */
export function useBackend() {
  const services = {
    async google() {},
    async apple() {},

    async post() {},
    async get() {},
  };

  return { services };
}
