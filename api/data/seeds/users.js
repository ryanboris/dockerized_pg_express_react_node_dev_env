exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { name: 'Bubba Sparxx', email: 'thisisgettinugly@ymail.com' },
        { name: 'Jay Kwon', email: 'hyphy@gmail.com' },
        { name: 'John Dough', email: 'pizzaman@yahoo.com' }
      ]);
    });
};
