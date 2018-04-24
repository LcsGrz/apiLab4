'use strict';

const conn = require('./conn');

exports.insert = (coll_name, object) => {
  return new Promise((resolve, reject) => {
    let _client = null;
    conn.open()
      .then(data => {
        _client = data.client;
        return data.db.collection(coll_name);
      })
      .then(coll => {
        return coll.insert(object);
      })
      .then(doc => {
        _client.close();
        resolve(doc);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.upsertOne = (coll_name, cond, object) => {
  return new Promise((resolve, reject) => {
    let _client = null;
    conn.open()
      .then(data => {
        _client = data.client;
        return data.db.collection(coll_name);
      })
      .then(coll => {
        coll.findOne(cond, (err, doc) => {
          if (!doc) {
            coll.insert(object)
              .then(doc => {
                _client.close();
                resolve(doc);
              })
              .catch(err => {
                reject(err);
              });
          }
          coll.update(cond, {
            $set: object
          })
            .then(doc => {
              _client.close();
              resolve(doc);
            })
            .catch(err => {
              reject(err);
            });
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.findMany = (coll_name, cond) => {
  return new Promise((resolve, reject) => {
    let _client = null;
    conn.open()
      .then(data => {
        _client = data.client;
        return data.db.collection(coll_name);
      })
      .then(coll => {
        return coll.find(cond, (err, cursor) => {
          return cursor.toArray();
        });
      })
      .then(obj => {
        _client.close();
        resolve(obj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.findOne = (coll_name, cond) => {
  return new Promise((resolve, reject) => {
    let _client = null;
    conn.open()
      .then(data => {
        _client = data.client;
        return data.db.collection(coll_name);
      })
      .then(coll => {
        return coll.findOne(cond);
      })
      .then(obj => {
        _client.close();
        resolve(obj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.deleteMany = (coll_name, cond) => {
  return new Promise((resolve, reject) => {
    let _client = null;
    conn.open()
      .then(data => {
        _client = data.client;
        return data.db.collection(coll_name);
      })
      .then(coll => {
        return coll.deleteMany(cond);
      })
      .then(doc => {
        _client.close();
        resolve(doc);
      })
      .catch(err => {
        reject(err);
      });
  });
};