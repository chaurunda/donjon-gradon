var dbconnection = "mongodb://127.0.0.1:27017/donjongradon";
var ObjectID = require('mongodb').ObjectID;
exports.index = function(ip, db, dbname){
    return function(req, res){
        // connect into your mongo database
        db.connect(dbconnection, function(err, db) {
            if(err) throw err;
            // Choose your table
            var collection = db.collection(dbname);
            collection.findOne({"_id" : ObjectID(req.params.id)}, function(err, player){
                console.log(player);
                res.render('game/index', { title: 'Donjon & Gradon', ip: ip, data : player });
            });
        });
    }
};
