/*
 * GET home page.
 */
// Set the connexion to your mongo database.
var dbconnection = "mongodb://127.0.0.1:27017/donjongradon";
var ObjectID = require('mongodb').ObjectID;
exports.index = function(ip, db, dbname){
    return function(req, res){
        // connect into your mongo database
        db.connect(dbconnection, function(err, db) {
            var collection = db.collection(dbname);
            if(err) throw err;
            // Choose your table
            collection.find().toArray(function(err, players) {
                if(err)
                    throw err;
                res.render('home/index', { title: 'Donjon & Gradon', ip: ip, players : players });
                db.close();
            });

        });
    }
};

exports.newGame = function(ip, db, dbname){
    return function(req, res){
        //req.body return all the field
        if(req.body.name && req.body.class) {
            db.connect(dbconnection, function(err, db){
                if(err) throw err;
                var collection = db.collection(dbname),
                insertObj = {
                    name : req.body.name,
                    class : req.body.class
                };
                collection.insert(insertObj, function(err, data){
                    if(err) throw err;
                    console.log(data);
                    res.json('/game/'+ data._id);
                });
            });
        } else {
            res.render('home/new', {title : 'Donjon & Gradon - New', ip : ip});
        }
    }
};
exports.deletePlayer = function (ip, db, dbname) {
    return function(req, res){
        db.connect(dbconnection, function(err, db) {
            if(err)
                throw err;
            var collection = db.collection(dbname);
            collection.remove( {"_id": ObjectID(req.params.id)  }, function(err,data){
                if(err)
                    throw err;
                res.redirect('/');
            });
        });
    }
}
