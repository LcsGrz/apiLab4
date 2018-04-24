const mongodb = require('./mongodb/mongodb');

mongodb.insert('user' /*collection name*/, {
  name: 'Nicolas Sturm', /* data to insert */
  age: 18, /* data to insert */
})
  .then(doc => {
    console.log(doc.result);
  })
  .catch(err => {
    console.log(err);
  });

mongodb.upsertOne('user' /*collection name*/, {
  age: 18 /*condition*/
}, {
  age: 19 /* data to modify */
})
  .then(doc => {
    console.log(doc.result);
  })
  .catch(err => {
    console.log(err);
  });

mongodb.findMany('user' /*collection name*/, {
  name: 'Nicolas Sturm' /*condition*/
})
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(err);
  });

mongodb.findOne('user' /*collection name*/, {
  name: 'Nicolas Sturm' /*condition*/
})
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(err);
  });

mongodb.deleteMany('user' /*collection name*/, {
  age: 19 /*condition*/
})
  .then(doc => {
    console.log(doc.result);
  })
  .catch(err => {
    console.log(err);
  });