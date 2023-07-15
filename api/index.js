const server = require('./src/app.js');
const { conn } = require('./src/db.js');
PORT = 3001;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  });
});
