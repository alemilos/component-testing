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

function simulator() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const success = simulateSuccessFailure(0.5);
      if (!success) alert("simulate request failed");
      res({ ok: success });
    }, 1000);
  });
}

// TODO: make a request function that returns
// {ok: true/false, data: res.data (if success), err: catched error (if failure)}

function simulateSuccessFailure(successRate) {
  return Math.random() <= successRate;
}
