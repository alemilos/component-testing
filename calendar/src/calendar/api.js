export const api = {
  google: simulateGoogleSync,
  apple: simulateAppleSync,
  post: (event) => simulatePostEvent(event),
  get: simulateGetEvents,
};

async function simulateGoogleSync() {
  await simulator();
  console.log("synced to google");
}

async function simulateAppleSync() {
  await simulator();
  console.log("synced to apple");
}

async function simulatePostEvent(event) {
  console.log(event, " saved");
  return await simulator();
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
