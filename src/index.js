const Server = require('./core/api.js');

async function startServer() {
  try {
    Server.listen(3000, () => {
      console.info('server is running on port 3000');
    });
  } catch (error) {
    console.error('Error Starting Server', error);
  }
}

startServer();