/**
 * useBackend provides an interface for CalendarProvider, to connect with the backend api.
 * @returns
 */
export function useBackend() {
  const services = {
    google: simulateGoogleSync,
    apple: simulateAppleSync,
    post: (event) => simulatePostEvent(event),
    get: simulateGetEvents,
  };

  return { services };
}

async function simulateGoogleSync() {
  await simulator();
  console.log("synced to google");
}

async function simulateAppleSync() {
  await simulator();
  console.log("synced to apple");
}

async function simulatePostEvent(event) {
  await simulator();
  console.log(event, " saved");
}

async function simulateGetEvents() {
  const events = [];
  await simulator();
  console.log("events found: ", events);
}

function simulator(something) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(something);
    }, 1000);
  });
}
