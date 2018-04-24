# MongoDB Usage Functions

A set of basic functions to connect and use mongodb

## Installation
 - Install mongodb package

```sh
$ npm i -S mongodb
```
 - Copy the mongodb folder to the root directory
 - Copy the data.js file to the root directory & configure with the name of your database
```javascript
'use strict';

module.exports = {
  mongoUrl: 'mongodb://127.0.0.1:27017/',
  mongoDbName: 'mongodbTest'
};
```

## Usage

```javascript
const mongodb = require('./mongodb/mongodb');

//insert an object

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
  
//check that the object was inserted
  
mongodb.findMany('user' /*collection name*/, {
  name: 'Nicolas Sturm' /*condition*/
})
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(err);
  });
```
### Insert
```javascript
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
```
### Upsert One (Update-Insert)
```javascript
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
```
### FindMany
```javascript
mongodb.findMany('user' /*collection name*/, {
  name: 'Nicolas Sturm' /*condition*/
})
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(err);
  });
```
### FindOne
```javascript
mongodb.findOne('user' /*collection name*/, {
  name: 'Nicolas Sturm' /*condition*/
})
  .then(obj => {
    console.log(obj);
  })
  .catch(err => {
    console.log(err);
  });
```
### DeleteMany
```javascript
mongodb.deleteMany('user' /*collection name*/, {
  age: 19 /*condition*/
})
  .then(doc => {
    console.log(doc.result);
  })
  .catch(err => {
    console.log(err);
  });
```


## License

MIT.

## Author

Nicolas Sturm -- sturmenta
