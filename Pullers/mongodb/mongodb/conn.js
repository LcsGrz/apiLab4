'use strict';

const data = require('../../dataMongo');
const mongoClient = require('mongodb').MongoClient;

exports.open = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(data.mongoUrl, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          db: client.db(data.mongoDbName),
          client: client
        });
      }
    });
  });
};

exports.close = (client) => {
  client.close();
};