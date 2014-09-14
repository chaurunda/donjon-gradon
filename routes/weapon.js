/*
 * Weapon page
 */
//var fs = require('fs');
//var ObjectID = require('mongodb').ObjectID;
//var formidable = require('formidable');
//var dbconnection = "mongodb://127.0.0.1:27017/donjongradon";

exports.index = function(req, res){
  res.render('weapon/weapon', { title: 'Donjon & Gradon - List of weapons'});
};
