const statusHTML = document.getElementById("status");

if (navigator.onLine) {
  statusHTML.innerText = "online";
} else {
  statusHTML.innerText = "offline";
}

window.addEventListener("online", () => {
  statusHTML.innerText = "online";
});

window.addEventListener("offline", () => {
  statusHTML.innerText = "offline";
});
