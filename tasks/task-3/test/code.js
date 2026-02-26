async function check() {
  return new Promise((resolve) => resolve());
}

function syncCheck() {
  return true;
}

// Should find error here
if (check()) {
  console.log("fake success");
}

if (await check()) {
  console.log("real success");
}

if (syncCheck) {
  console.log("sync success");
}

const checkPromise = check();
