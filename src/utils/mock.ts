export function Mock() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Promise.resolve("OK");
    }, 2000);
  });
}
