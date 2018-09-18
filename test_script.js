const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

console.log(client.user, client.port); // expecting "development", 5432

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query("SELECT $1::int AS number", ["10101010"], (err, result) => {
    if (err) {
      return console.error("Error running query", err);
    }


    console.log("Row 1 is:", result.rows[0].number); //should output 1
    client.end();
  });

});
