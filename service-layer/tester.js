import { serviceManager } from "./ServiceManager";

import * as localNotes from "./services/local/notes/index";
import * as remoteNotes from "./services/remote/notes/index";

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

function sendBothRequests() {
  serviceManager.mutate({
    data: { content: "the note content" },
    localService: localNotes.add,
    remoteService: remoteNotes.add,
  });
}

function sendMany() {}
