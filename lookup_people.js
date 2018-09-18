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

  // Prints an enumerated list of hits.
  const printResults = function (array) {
    let index = 1;
    array.forEach((i) => {
      console.log(`- ${index}: ${i.first_name} ${i.last_name}, born ${i.birthdate.toLocaleString().slice(0, -9)}.`);
      index++;
    })
  }

  console.log(`Found ${res.rows.length} result(s).\n`);
  printResults(res.rows);

  client.end();
});

