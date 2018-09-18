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
const firstName = process.argv[2];
const lastName = process.argv[3];
const dateOfBirth = process.argv[4];

// Function
const newFamousPerson = function () {
  knex("famous_people")
    .insert({
      "first_name": firstName,
      "last_name": lastName,
      "birthdate": dateOfBirth
    })
    .asCallback((err, record) => {
      if (err) return console.error(err);
      console.log(`New record added to database:\n${firstName} ${lastName}, born ${dateOfBirth}.`);
    });
}

newFamousPerson();
