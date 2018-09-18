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

// Take commandline arguments
const name = process.argv[2];

client.connect()

console.log("Searching database for", name, "...");

  // Make your query here.
client.query(`
  SELECT * FROM famous_people
  WHERE $1 ILIKE first_name
    OR $1 ILIKE last_name
  `, [name], (err, res) => {
  if (err) {
    return "Querying Error: ", err;
  }

  console.log(res.rows);
});

// console.log("And now you've been disconnected.");
// client.end();
