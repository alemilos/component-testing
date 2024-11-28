import { ServiceManager } from "./ServiceManager.js";
import * as localNotes from "./services/local/notes/index.js";
import * as remoteNotes from "./services/remote/notes/index.js";

const serviceManager = new ServiceManager();

function sendRemoteRequest() {
  serviceManager.mutate({
    data: { content: "the note content" },
    remoteService: remoteNotes.add,
  });
}

function sendLocalRequest() {
  serviceManager.mutate({
    data: { content: "the note content" },
    localService: localNotes.add,
  });
}

async function sendBothRequests() {
  await serviceManager.mutate({
    data: { content: "the note content" },
    localService: localNotes.add,
    remoteService: remoteNotes.add,
  });
}

sendBothRequests();

function sendMany() {}
