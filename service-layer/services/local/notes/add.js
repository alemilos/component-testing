export default async function add(note) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ ok: true, saved: note });
      } else {
        reject("Could not save note");
      }
    }, 3000);
  });
}
