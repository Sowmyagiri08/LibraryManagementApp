const Hapi = require("hapi");
const { configureRoutes } = require('./routes');

//Create Server
const server = new Hapi.Server({
    "host":"localhost",
    "port":3000
});

//Configure routes and start the server
const main = async () => {
    await configureRoutes(server);
    await server.start();
    return server;
  }
  
  main().then(server => {
    console.log('Server running at:', server.info.uri);
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });

 