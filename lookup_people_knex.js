const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

// Take commandline argument
const name = process.argv[2];

const printResults = function (array) {
  let index = 1;
  array.forEach((i) => {
    console.log(`- ${index}: ${i.first_name} ${i.last_name}, born ${i.birthdate.toLocaleString().slice(0, -9)}.`);
    index++;
  })
}

knex
  .select()
  .table("famous_people")
  .where("first_name", "ILIKE", name)
  .orWhere("last_name", "ILIKE", name)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);

    console.log(`When searching for "${name}", found ${rows.length} entries:\n`);
    printResults(rows);
  })
  .asCallback(function(err, rows) {
    knex.destroy();
  });
