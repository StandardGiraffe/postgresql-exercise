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

knex
  .select()
  .table("famous_people")
  .asCallback(function(err, rows) {
    if (err) return console.error(err);

    console.log(rows);
  })
  .asCallback(function(err, rows) {
    knex.destroy();
  });
