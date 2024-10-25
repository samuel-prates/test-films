const Application = require('./src/application/Application');
const app = new Application();

(async () => {
  try {
    await app.start();
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
})();
