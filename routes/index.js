/*
 * GET home page.
 */
// Set the connexion to your mongo database.
var dbconnection = "mongodb://127.0.0.1:27017/donjongradon";
exports.index = function(ip, db){
    return function(req, res){
        // connect into your mongo database
        db.connect(dbconnection, function(err, db) {
            if(err) throw err;
            // Choose your table
            res.render('home/index', { title: 'Donjon & Gradon', ip: ip });
        });
    }
};

exports.newGame = function(ip, db){
    return function(req, res){
        //req.body return all the field
        if(req.body.name && req.body.class) {
            db.connect(dbconnection, function(err, db){
                if(err) throw err;
                var collection = db.collection('test'),
                insertObj = {
                    name : req.body.name,
                    class : req.body.class
                };
                collection.insert(insertObj, function(err, data){
                    if(err) throw err;
                    console.log(data);
                    res.render('player/index', data);
                });
            });
        } else {
            res.render('home/new', {title : 'Donjon & Gradon - New', ip : ip});
        }
    }
};
