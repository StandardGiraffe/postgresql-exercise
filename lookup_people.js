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
const firstName = process.argv[2];
const lastName = process.argv[3];

client.connect()

console.log("Searching database for", firstName, lastName, "...");

  // Make your query here.
client.query(`
  SELECT * FROM famous_people
  WHERE $1 ILIKE first_name
  `, [firstName], (err, res) => {
  if (err) {
    return "Querying Error: ", err;
  }

  console.log(res.rows);
});

  // console.log(res.rows[0]);

client.end();
console.log("And now you've been disconnected.");
