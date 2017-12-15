"use strict";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/emu';

var database;

class Database{
    connect(){
        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          console.log("Connected correctly to server.");
          database = db;
        });
    }

    update(condition, data) {
       database.collection('users').updateOne(
          condition,
          {
            $set: data,
            //$currentDate: { "lastModified": true }
          }, function(err, results) {
      });
    }

    count(condition, callback){
        var docs = database.collection('users').find(condition);
        docs.count(function(error, n) {
            callback(n);
        });
    }

    fetch(condition, callback){
        database.collection('users').findOne(condition, function(err, document){
            callback(document);
        });
    }
}


module.exports = Database;
